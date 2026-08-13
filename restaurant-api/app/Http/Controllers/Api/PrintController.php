<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\PrintJob;
use App\Services\PrinterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PrintController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => PrintJob::latest()->limit(100)->get(),
        ]);
    }

    public function printOrder(Request $request, Order $order, PrinterService $printer): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:receipt,kitchen',
        ]);

        $job = $printer->printOrder($order, $validated['type']);

        return response()->json([
            'success' => $job->status !== 'failed',
            'message' => $job->status === 'sent' ? 'Print job sent' : 'Print job queued',
            'data' => $job,
        ], $job->status === 'failed' ? 502 : 201);
    }

    public function store(Request $request, PrinterService $printer): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:receipt,kitchen',
            'order_id' => 'nullable|integer|exists:orders,id',
            'order' => 'nullable|array',
        ]);

        if (!empty($validated['order_id'])) {
            $order = Order::with('orderItems')->findOrFail($validated['order_id']);
            $job = $printer->printOrder($order, $validated['type']);
        } else {
            $job = $printer->createAdHocJob($validated['order'] ?? [], $validated['type']);
        }

        return response()->json([
            'success' => $job->status !== 'failed',
            'message' => $job->status === 'sent' ? 'Print job sent' : 'Print job queued',
            'data' => $job,
        ], $job->status === 'failed' ? 502 : 201);
    }
}
