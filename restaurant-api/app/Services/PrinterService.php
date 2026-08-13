<?php

namespace App\Services;

use App\Models\Order;
use App\Models\PrintJob;

class PrinterService
{
    public function printOrder(Order $order, string $type): PrintJob
    {
        $order->loadMissing('orderItems');
        $printer = $this->printerConfig($type);
        $payload = $type === 'kitchen'
            ? $this->buildKitchenTicket($order)
            : $this->buildReceipt($order);

        $job = PrintJob::create([
            'order_id' => $order->id,
            'type' => $type,
            'printer_name' => $printer['name'] ?? null,
            'printer_host' => $printer['host'] ?? null,
            'printer_port' => $printer['port'] ?? null,
            'status' => 'queued',
            'payload' => $payload,
        ]);

        return $this->sendJob($job);
    }

    public function createAdHocJob(array $orderData, string $type): PrintJob
    {
        $printer = $this->printerConfig($type);
        $payload = $type === 'kitchen'
            ? $this->buildKitchenTicketFromArray($orderData)
            : $this->buildReceiptFromArray($orderData);

        $job = PrintJob::create([
            'type' => $type,
            'printer_name' => $printer['name'] ?? null,
            'printer_host' => $printer['host'] ?? null,
            'printer_port' => $printer['port'] ?? null,
            'status' => 'queued',
            'payload' => $payload,
        ]);

        return $this->sendJob($job);
    }

    private function sendJob(PrintJob $job): PrintJob
    {
        if (!$job->printer_host) {
            $job->update([
                'status' => 'queued',
                'error' => 'Printer host is not configured. Set POS_RECEIPT_PRINTER_HOST or POS_KITCHEN_PRINTER_HOST in .env.',
            ]);

            return $job;
        }

        try {
            $socket = @fsockopen(
                $job->printer_host,
                $job->printer_port ?: 9100,
                $errno,
                $errstr,
                (float) config('pos.timeout', 3)
            );

            if (!$socket) {
                throw new \RuntimeException(trim($errstr) ?: "Printer connection failed ({$errno})");
            }

            fwrite($socket, $job->payload);
            fclose($socket);

            $job->update([
                'status' => 'sent',
                'error' => null,
                'sent_at' => now(),
            ]);
        } catch (\Throwable $e) {
            $job->update([
                'status' => 'failed',
                'error' => $e->getMessage(),
            ]);
        }

        return $job;
    }

    private function printerConfig(string $type): array
    {
        return config($type === 'kitchen' ? 'pos.kitchen_printer' : 'pos.receipt_printer');
    }

    private function buildReceipt(Order $order): string
    {
        return $this->buildReceiptFromArray([
            'id' => $order->id,
            'tableNumber' => $order->table_number,
            'type' => $order->type,
            'subtotal' => $order->subtotal,
            'tax' => $order->tax,
            'deliveryFee' => $order->delivery_fee,
            'total' => $order->total,
            'items' => $order->orderItems->map(fn ($item) => [
                'name' => $item->name,
                'quantity' => $item->quantity,
                'price' => $item->price,
            ])->all(),
        ]);
    }

    private function buildKitchenTicket(Order $order): string
    {
        return $this->buildKitchenTicketFromArray([
            'id' => $order->id,
            'tableNumber' => $order->table_number,
            'type' => $order->type,
            'items' => $order->orderItems->map(fn ($item) => [
                'name' => $item->name,
                'quantity' => $item->quantity,
                'notes' => $item->notes,
            ])->all(),
        ]);
    }

    private function buildReceiptFromArray(array $order): string
    {
        $lines = [
            $this->center('יאסו טברנה רודוס'),
            str_repeat('-', 42),
            'קבלה: ' . ($order['id'] ?? $order['client_order_id'] ?? date('YmdHis')),
            'שולחן: ' . ($order['tableNumber'] ?? $order['table_number'] ?? '-'),
            'סוג הזמנה: ' . ($order['type'] ?? 'dine-in'),
            'תאריך: ' . now()->format('d/m/Y H:i'),
            str_repeat('-', 42),
        ];

        foreach (($order['items'] ?? []) as $item) {
            $name = $item['nameHe'] ?? $item['name_he'] ?? $item['name'] ?? 'פריט';
            $quantity = $item['quantity'] ?? 1;
            $price = $this->formatEuro(($item['price'] ?? 0) * $quantity);
            $lines[] = "{$quantity} {$name}    {$price}";
        }

        $lines[] = str_repeat('-', 42);
        $lines[] = 'סיכום ביניים: ' . $this->formatEuro($order['subtotal'] ?? 0);
        $lines[] = 'מע"מ: ' . $this->formatEuro($order['tax'] ?? 0);
        if (($order['deliveryFee'] ?? $order['delivery_fee'] ?? 0) > 0) {
            $lines[] = 'משלוח: ' . $this->formatEuro($order['deliveryFee'] ?? $order['delivery_fee']);
        }
        $lines[] = 'סה"כ לתשלום: ' . $this->formatEuro($order['total'] ?? 0);
        $lines[] = "\n\n\n";

        return implode("\n", $lines);
    }

    private function buildKitchenTicketFromArray(array $order): string
    {
        $lines = [
            $this->center('הזמנה למטבח'),
            str_repeat('=', 42),
            'הזמנה: ' . ($order['id'] ?? $order['client_order_id'] ?? date('YmdHis')),
            'שולחן: ' . ($order['tableNumber'] ?? $order['table_number'] ?? '-'),
            'סוג הזמנה: ' . ($order['type'] ?? 'dine-in'),
            'זמן: ' . now()->format('H:i'),
            str_repeat('=', 42),
        ];

        foreach (($order['items'] ?? []) as $item) {
            $name = $item['nameHe'] ?? $item['name_he'] ?? $item['name'] ?? 'פריט';
            $lines[] = ($item['quantity'] ?? 1) . ' x ' . $name;
            if (!empty($item['notes'])) {
                $lines[] = 'הערה: ' . $item['notes'];
            }
        }

        $lines[] = "\n\n\n";

        return implode("\n", $lines);
    }

    private function formatEuro($amount): string
    {
        return number_format((float) $amount, 2) . '€';
    }

    private function center(string $text): string
    {
        return $text;
    }
}
