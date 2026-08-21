document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        // App state
        currentTab: 'pos',
        language: 'en',
        direction: 'ltr',
        orderType: 'dine-in',
        
        // Inventory Management
        showInventory: false,
        inventoryTab: 'inventory', // inventory, purchases, suppliers, waste, reports
        
        // Inventory state
        inventory: [],
        suppliers: [],
        purchases: [],
        waste: [],
        inventoryAlerts: [],
        
        // Inventory form states
        showInventoryForm: false,
        showPurchaseForm: false,
        showSupplierForm: false,
        showWasteForm: false,
        editingInventory: null,
        editingPurchase: null,
        editingSupplier: null,
        
        // Inventory form
        inventoryForm: {
            name: '',
            category: '',
            unit: '',
            currentStock: 0,
            minStock: 0,
            maxStock: 0,
            cost: 0,
            supplier: '',
            location: '',
            expiryDate: null,
            notes: ''
        },
        
        // Purchase form
        purchaseForm: {
            supplier: '',
            items: [],
            totalCost: 0,
            purchaseDate: new Date().toISOString().split('T')[0],
            expectedDelivery: null,
            notes: ''
        },
        
        // Supplier form
        supplierForm: {
            name: '',
            contact: '',
            phone: '',
            email: '',
            address: '',
            paymentTerms: '',
            notes: ''
        },
        
        // Waste form
        wasteForm: {
            item: '',
            quantity: 0,
            reason: '',
            date: new Date().toISOString().split('T')[0],
            notes: ''
        },
        
        // Inventory filters and search
        inventorySearchTerm: '',
        inventoryFilterCategory: 'all',
        inventorySortBy: 'name',
        inventorySortOrder: 'asc',
        
        // POS State Variables
        posSearchTerm: '',
        posFilterCategory: 'all',
        posSortBy: 'menu',
        posQuickFilter: 'all',
        posActiveCategory: 'all',
        showRecipeForm: false,
        editingRecipe: null,
        selectedRecipe: null,
        scalePortions: 4,
        showSettings: false,
        selectedTable: null,
        showReceipt: false,
        currentReceipt: null,
        showPrintOptions: false,
        showReports: false,
        showBackup: false,
        kdsView: 'all', // all, new, preparing, ready
        kdsFilter: 'all', // all, dine-in, takeaway, delivery
        kdsSort: 'time', // time, priority, table
        showKdsSettings: false,
        kdsAutoRefresh: true,
        kdsSoundEnabled: true,
        kdsNotifications: true,
        kdsRefreshInterval: 30, // seconds
        kdsPriorityOrders: [],
        kdsUrgentOrders: [],
        kdsRefreshTimer: null,
        kdsStationFilter: 'all',
        
        // Chef/Station Management
        chefs: [
            { name: 'אבישג', nameEn: 'Chef Avishag' },
            { name: 'בן', nameEn: 'Chef Ben' },
            { name: 'קרלוס', nameEn: 'Chef Carlos' }
        ],
        stations: [
            { name: 'Grill', nameHe: 'גריל' },
            { name: 'Fry', nameHe: 'טיגון' },
            { name: 'Salad', nameHe: 'סלטים' },
            { name: 'Dessert', nameHe: 'קינוחים' }
        ],
        showChefAssignModal: false,
        chefAssignOrderId: null,
        chefAssignName: '',
        chefAssignStation: '',
        showChefStationManager: false,
        chefStationTab: 'chefs',
        newChefName: '',
        newStationName: '',
        
        // Sample data
        currentOrder: {
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            tableNumber: null,
            deliveryFee: 0
        },
        
        // Settings
        settings: {
            taxRate: 10,
            deliveryFee: 5,
            currency: 'EUR',
            restaurantName: 'Yasou Taverna',
            address: 'Yasou Taverna',
            phone: '',
            email: '',
            website: '',
            receiptFooter: 'Thank you for dining with us!',
            logo: '',
            printLogo: true,
            printHeader: true,
            printFooter: true,
            autoPrint: false,
            receiptWidth: 80,
            fontSize: 12,
            backendEnabled: true,
            backendUrl: 'http://127.0.0.1:8001/api',
            printViaBackend: true
        },
        
        // Tables
        tables: [],
        showTableForm: false,
        editingTable: null,
        tableForm: {
            id: null,
            number: '',
            capacity: 4,
            status: 'available',
            location: '',
            notes: '',
            reservationTime: null,
            customerName: '',
            customerPhone: ''
        },
        
        // Reports data
        reports: {
            dailySales: [],
            monthlySales: [],
            topItems: [],
            categorySales: []
        },
        
        // Recipe Management with enhanced features
        recipeCategories: ["Opening","Salads","Hummus","Meat & Chicken","Fish","Vegan / Vegetarian","Soft Drinks","Alcoholic Drinks","Dessert","Nargilla"],
        showRecipeCategories: false,
        recipeSearchTerm: '',
        recipeFilterCategory: 'all',
        recipeSortBy: 'name', // name, price, category, date
        recipeSortOrder: 'asc', // asc, desc
        
        // Enhanced recipe form with more fields
        recipeForm: {
            id: null,
            name: '',
            category: '',
            price: 0,
            basePortions: 4,
            prepTime: 15, // minutes
            cookTime: 20, // minutes
            difficulty: 'medium', // easy, medium, hard
            allergens: [], // array of allergen strings
            tags: [], // array of tag strings
            ingredients: [
                {name: '', quantity: 0, unit: '', notes: ''}
            ],
            instructions: '',
            notes: '',
            image: '',
            isActive: true,
            createdAt: null,
            updatedAt: null
        },
        
        // English translations
        translations: {
            // App
            appTitle: 'Yasou Taverna POS',
            
            // POS
            pos: 'POS',
            orderType: 'Order Type',
            dineIn: 'Dine-In',
            takeaway: 'Takeaway',
            delivery: 'Delivery',
            currentOrder: 'Current Order',
            item: 'Item',
            total: 'Total',
            subtotal: 'Subtotal',
            tax: 'Tax',
            placeOrder: 'Place Order',
            emptyOrder: 'Add items to your order',
            table: 'Table',
            seats: 'seats',
            items: 'Items',
            searchItemsPlaceholder: 'Search items by name, category, or tags...',
            allCategories: 'All Categories',
            sortByName: 'Sort by Name',
            sortByPrice: 'Sort by Price',
            sortByPopularity: 'Sort by Popularity',
            sortByCategory: 'Sort by Category',
            allItems: 'All Items',
            popular: 'Popular',
            vegetarian: 'Vegetarian',
            spicy: 'Spicy',
            healthy: 'Healthy',
            minutesPrep: 'm prep',
            addToOrder: 'Add to Order',
            noItemsFound: 'No items found',
            tryAdjustingFilters: 'Try adjusting your search or filters',
            preview: 'Preview',
            saveDraft: 'Save Draft',
            minutesShort: 'min',
            orderNumber: 'Order',
            deleteTableConfirm: 'Are you sure you want to delete this table?',
            
            // KDS
            kds: 'Kitchen Display',
            newOrders: 'New Orders',
            preparing: 'Preparing',
            ready: 'Ready',
            startPreparing: 'Start Preparing',
            markReady: 'Mark as Ready',
            complete: 'Complete',
            noNewOrders: 'No new orders',
            noPreparingOrders: 'No orders in preparation',
            noReadyOrders: 'No orders ready',
            allOrders: 'All Orders',
            allTypes: 'All Types',
            allStations: 'All Stations',
            sortByTime: 'By Time',
            sortByPriority: 'By Priority',
            sortByTable: 'By Table',
            pendingOrders: 'Pending',
            avgPrepTime: 'Avg Prep Time',
            efficiency: 'Efficiency',
            age: 'Age',
            estimated: 'Est',
            priority: 'Priority',
            progress: 'Progress',
            minutesUnit: 'm',
            searchRecipes: 'Search recipes...',
            selectCategory: 'Select Category',
            sortByDate: 'Sort by Date',
            prepTime: 'Prep Time',
            cookTime: 'Cook Time',
            difficulty: 'Difficulty',
            active: 'Active',
            availableForOrdering: 'Available for ordering',
            ingredient: 'Ingredient',
            quantity: 'Qty',
            unit: 'Unit',
            tags: 'Tags',
            tagsPlaceholder: 'vegetarian, spicy, gluten-free',
            notes: 'Notes',
            duplicate: 'Duplicate',
            unknown: 'Unknown',
            noInstructionsAvailable: 'No instructions available',
            noRecipesMatching: 'No recipes found matching your criteria',
            each: 'each',
            
            // Enhanced KDS
            kdsSettings: 'KDS Settings',
            kdsView: 'KDS View',
            kdsFilter: 'Filter Orders',
            kdsSort: 'Sort Orders',
            kdsAutoRefresh: 'Auto Refresh',
            kdsSoundEnabled: 'Sound Notifications',
            kdsNotifications: 'Browser Notifications',
            kdsRefreshInterval: 'Refresh Interval (seconds)',
            kdsPriorityOrders: 'Priority Orders',
            kdsUrgentOrders: 'Urgent Orders',
            kdsOrderTimer: 'Order Timer',
            kdsPrepTime: 'Prep Time',
            kdsEstimatedTime: 'Estimated Time',
            kdsActualTime: 'Actual Time',
            kdsTimeRemaining: 'Time Remaining',
            kdsOverdue: 'Overdue',
            kdsOnTime: 'On Time',
            kdsEarly: 'Early',
            kdsLate: 'Late',
            kdsOrderNotes: 'Order Notes',
            kdsSpecialInstructions: 'Special Instructions',
            kdsAllergenInfo: 'Allergen Information',
            kdsModifications: 'Modifications',
            kdsUrgent: 'Urgent',
            
            // Inventory Management
            inventory: 'Inventory',
            inventoryManagement: 'Inventory Management',
            addInventory: 'Add Item',
            editInventory: 'Edit Item',
            deleteInventory: 'Delete Item',
            inventoryName: 'Item Name',
            inventoryCategory: 'Category',
            inventoryUnit: 'Unit',
            currentStock: 'Current Stock',
            minStock: 'Min Stock',
            maxStock: 'Max Stock',
            cost: 'Cost',
            supplier: 'Supplier',
            location: 'Location',
            expiryDate: 'Expiry Date',
            notes: 'Notes',
            saveInventory: 'Save Item',
            cancel: 'Cancel',
            
            // Purchases
            purchases: 'Purchases',
            addPurchase: 'Add Purchase',
            editPurchase: 'Edit Purchase',
            purchaseDate: 'Purchase Date',
            expectedDelivery: 'Expected Delivery',
            totalCost: 'Total Cost',
            purchaseStatus: 'Status',
            pending: 'Pending',
            received: 'Received',
            savePurchase: 'Save Purchase',
            
            // Suppliers
            suppliers: 'Suppliers',
            addSupplier: 'Add Supplier',
            editSupplier: 'Edit Supplier',
            deleteSupplier: 'Delete Supplier',
            supplierName: 'Supplier Name',
            contact: 'Contact Person',
            phone: 'Phone',
            email: 'Email',
            address: 'Address',
            paymentTerms: 'Payment Terms',
            saveSupplier: 'Save Supplier',
            
            // Waste
            waste: 'Waste',
            addWaste: 'Add Waste',
            wasteQuantity: 'Quantity',
            wasteReason: 'Reason',
            wasteDate: 'Date',
            saveWaste: 'Save Waste',
            
            // Reports
            inventoryReports: 'Inventory Reports',
            stockValue: 'Stock Value',
            lowStock: 'Low Stock',
            outOfStock: 'Out of Stock',
            stockTransactions: 'Stock Transactions',
            exportInventory: 'Export Inventory',
            importInventory: 'Import Inventory',
            searchInventory: 'Search inventory...',
            sortByName: 'Sort by Name',
            sortByCategory: 'Sort by Category',
            sortByStock: 'Sort by Stock',
            sortByCost: 'Sort by Cost',
            lowStockAlerts: 'Low Stock Alerts',
            stock: 'Stock',
            noInventoryItems: 'No inventory items found',
            unitPiece: 'pc',
            unitGram: 'g',
            kdsPriority: 'Priority',
            kdsNormal: 'Normal',
            kdsLow: 'Low',
            kdsOrderAge: 'Order Age',
            kdsTimeInQueue: 'Time in Queue',
            kdsAveragePrepTime: 'Average Prep Time',
            kdsKitchenStats: 'Kitchen Statistics',
            kdsOrdersPerHour: 'Orders per Hour',
            kdsEfficiency: 'Efficiency',
            kdsBottleneck: 'Bottleneck Items',
            kdsPerformance: 'Performance',
            kdsFullScreen: 'Full Screen',
            kdsCompactView: 'Compact View',
            kdsDetailedView: 'Detailed View',
            kdsPrintOrder: 'Print Order',
            kdsAssignChef: 'Assign Chef',
            kdsChefName: 'Chef Name',
            kdsStation: 'Station',
            kdsStation1: 'Station 1',
            kdsStation2: 'Station 2',
            kdsStation3: 'Station 3',
            kdsStation4: 'Station 4',
            kdsAssignOrder: 'Assign Order',
            kdsUnassignOrder: 'Unassign Order',
            kdsOrderAssigned: 'Order Assigned',
            kdsOrderUnassigned: 'Order Unassigned',
            kdsMarkUrgent: 'Mark Urgent',
            kdsUnmarkUrgent: 'Unmark Urgent',
            kdsAddNote: 'Add Note',
            kdsOrderNotes: 'Order Notes',
            kdsPrepProgress: 'Prep Progress',
            kdsKitchenEfficiency: 'Kitchen Efficiency',
            kdsOnTimeDelivery: 'On-Time Delivery',
            kdsUrgentOrders: 'Urgent Orders',
            kdsPriorityOrders: 'Priority Orders',
            kdsOrderProgress: 'Order Progress',
            kdsTimeTracking: 'Time Tracking',
            kdsPerformanceMetrics: 'Performance Metrics',
            kdsRealTimeUpdates: 'Real-Time Updates',
            kdsOrderQueue: 'Order Queue',
            kdsKitchenFlow: 'Kitchen Flow',
            kdsOrderManagement: 'Order Management',
            kdsChefAssignment: 'Chef Assignment',
            kdsStationManagement: 'Station Management',
            kdsOrderPrioritization: 'Order Prioritization',
            kdsTimeManagement: 'Time Management',
            kdsQualityControl: 'Quality Control',
            kdsKitchenAnalytics: 'Kitchen Analytics',
            kdsAssignedTo: 'Assigned to',
            kdsSelectChef: 'Select Chef',
            kdsSelectStation: 'Select Station',
            kdsSave: 'Save',
            kdsManageChefs: 'Manage Chefs',
            kdsManageStations: 'Manage Stations',
            kdsAddChef: 'Add Chef',
            kdsAddStation: 'Add Station',
            kdsName: 'Name',
            select: 'Select',
            addChefPlaceholder: 'Add chef...',
            addStationPlaceholder: 'Add station...',
            
            // Prep Time Status Translations
            overdue: 'Overdue',
            late: 'Late',
            early: 'Early',
            'on-time': 'On Time',
            
            // Recipes
            recipes: 'Recipes',
            recipeList: 'Recipe List',
            addRecipe: 'Add Recipe',
            editRecipe: 'Edit Recipe',
            recipeName: 'Recipe Name',
            category: 'Category',
            price: 'Price',
            basePortions: 'Base Portions',
            ingredients: 'Ingredients',
            instructions: 'Instructions',
            addIngredient: 'Add Ingredient',
            saveRecipe: 'Save Recipe',
            cancel: 'Cancel',
            scaleToPortions: 'Scale to Portions',
            selectRecipe: 'Select a recipe to view details',
            noRecipes: 'No recipes found. Add your first recipe!',
            deleteRecipeConfirm: 'Are you sure you want to delete this recipe?',
            
            // Settings
            settings: 'Settings',
            taxRate: 'Tax Rate (%)',
            deliveryFee: 'Delivery Fee',
            currency: 'Currency',
            saveSettings: 'Save Settings',
            
            // Tables
            tables: 'Tables',
            tableManagement: 'Table Management',
            addTable: 'Add Table',
            tableNumber: 'Table Number',
            capacity: 'Capacity',
            status: 'Status',
            available: 'Available',
            occupied: 'Occupied',
            reserved: 'Reserved',
            selectTable: 'Select Table',
            noTables: 'No tables available',
            tableOrders: 'Table Orders',
            newOrder: 'New Order',
            viewOrders: 'View Orders',
            closeTable: 'Close Table',
            editTable: 'Edit Table',
            deleteTable: 'Delete Table',
            location: 'Location',
            notes: 'Notes',
            reservation: 'Reservation',
            customerName: 'Customer Name',
            customerPhone: 'Customer Phone',
            reservationTime: 'Reservation Time',
            makeReservation: 'Make Reservation',
            cancelReservation: 'Cancel Reservation',
            tableDetails: 'Table Details',
            tableHistory: 'Table History',
            occupancyTime: 'Occupancy Time',
            revenue: 'Revenue',
            averageOrderValue: 'Average Order Value',
            tableStatus: 'Table Status',
            cleaning: 'Cleaning',
            maintenance: 'Maintenance',
            indoorArea: 'Indoor Area',
            coveredArea: 'Covered Area',
            outdoorArea: 'Outdoor Area',
            
            // Receipt & Print
            receipt: 'Receipt',
            printReceipt: 'Print Receipt',
            printOptions: 'Print Options',
            print: 'Print',
            receiptNumber: 'Receipt #',
            date: 'Date',
            time: 'Time',
            server: 'Server',
            customer: 'Customer',
            items: 'Items',
            qty: 'Qty',
            amount: 'Amount',
            serviceCharge: 'Service Charge',
            discount: 'Discount',
            grandTotal: 'Grand Total',
            paymentMethod: 'Payment Method',
            cash: 'Cash',
            card: 'Card',
            change: 'Change',
            thankYou: 'Thank You',
            
            // Reports
            reports: 'Reports',
            salesReport: 'Sales Report',
            dailyReport: 'Daily Report',
            monthlyReport: 'Monthly Report',
            topItems: 'Top Items',
            categoryReport: 'Category Report',
            exportData: 'Export Data',
            generateReport: 'Generate Report',
            totalSales: 'Total Sales',
            totalOrders: 'Total Orders',
            completedOrders: 'Completed Orders',
            averageOrder: 'Average Order',
            
            // Backup & Settings
            backup: 'Backup & Restore',
            exportBackup: 'Export Backup',
            importBackup: 'Import Backup',
            restoreData: 'Restore Data',
            restaurantInfo: 'Restaurant Information',
            contactInfo: 'Contact Information',
            receiptSettings: 'Receipt Settings',
            printSettings: 'Print Settings',
            backendSettings: 'Backend Settings',
            logoUpload: 'Upload Logo',
            receiptFooter: 'Receipt Footer',
            autoPrint: 'Auto Print',
            backendEnabled: 'Save orders to backend',
            backendUrl: 'Backend URL',
            printViaBackend: 'Print through backend',
            receiptWidth: 'Receipt Width (mm)',
            fontSize: 'Font Size (pt)'
        },
        
        // Hebrew translations
        heTranslations: {
            appTitle: 'Yasou Taverna POS',
            pos: 'קופה',
            orderType: 'סוג הזמנה',
            dineIn: 'ישיבה במסעדה',
            takeaway: 'איסוף עצמי',
            delivery: 'משלוח',
            currentOrder: 'הזמנה נוכחית',
            item: 'פריט',
            total: 'סה״כ',
            subtotal: 'סיכום ביניים',
            tax: 'מע״מ',
            placeOrder: 'בצע הזמנה',
            emptyOrder: 'הוסף פריטים להזמנה',
            table: 'שולחן',
            seats: 'מקומות',
            items: 'פריטים',
            searchItemsPlaceholder: 'חיפוש מנות לפי שם, קטגוריה או תגיות...',
            allCategories: 'כל הקטגוריות',
            sortByName: 'מיון לפי שם',
            sortByPrice: 'מיון לפי מחיר',
            sortByPopularity: 'מיון לפי פופולריות',
            sortByCategory: 'מיון לפי קטגוריה',
            allItems: 'כל המנות',
            popular: 'פופולרי',
            vegetarian: 'צמחוני',
            spicy: 'חריף',
            healthy: 'בריא',
            minutesPrep: 'דק׳ הכנה',
            addToOrder: 'הוסף להזמנה',
            noItemsFound: 'לא נמצאו מנות',
            tryAdjustingFilters: 'נסה לשנות חיפוש או סינון',
            preview: 'תצוגה',
            saveDraft: 'שמור טיוטה',
            minutesShort: 'דק׳',
            orderNumber: 'הזמנה',
            deleteTableConfirm: 'האם למחוק את השולחן הזה?',
            kds: 'מסך מטבח',
            newOrders: 'הזמנות חדשות',
            preparing: 'בהכנה',
            ready: 'מוכן',
            startPreparing: 'התחל הכנה',
            markReady: 'סמן כמוכן',
            complete: 'סיים',
            noNewOrders: 'אין הזמנות חדשות',
            noPreparingOrders: 'אין הזמנות בהכנה',
            noReadyOrders: 'אין הזמנות מוכנות',
            allOrders: 'כל ההזמנות',
            allTypes: 'כל הסוגים',
            allStations: 'כל התחנות',
            sortByTime: 'לפי זמן',
            sortByPriority: 'לפי דחיפות',
            sortByTable: 'לפי שולחן',
            pendingOrders: 'ממתינות',
            avgPrepTime: 'זמן הכנה ממוצע',
            efficiency: 'יעילות',
            age: 'גיל',
            estimated: 'משוער',
            priority: 'דחיפות',
            progress: 'התקדמות',
            total: 'סה״כ',
            minutesUnit: 'דק׳',
            searchRecipes: 'חיפוש מתכונים...',
            selectCategory: 'בחר קטגוריה',
            sortByDate: 'מיון לפי תאריך',
            prepTime: 'זמן הכנה',
            cookTime: 'זמן בישול',
            difficulty: 'רמת קושי',
            active: 'פעיל',
            availableForOrdering: 'זמין להזמנה',
            ingredient: 'מרכיב',
            quantity: 'כמות',
            unit: 'יחידה',
            tags: 'תגיות',
            tagsPlaceholder: 'צמחוני, חריף, ללא גלוטן',
            notes: 'הערות',
            duplicate: 'שכפל',
            unknown: 'לא ידוע',
            noInstructionsAvailable: 'אין הוראות זמינות',
            noRecipesMatching: 'לא נמצאו מתכונים לפי הסינון',
            each: 'ליחידה',
            recipes: 'מתכונים',
            recipeList: 'רשימת מתכונים',
            addRecipe: 'הוסף מתכון',
            editRecipe: 'ערוך מתכון',
            recipeName: 'שם מתכון',
            category: 'קטגוריה',
            price: 'מחיר',
            basePortions: 'מנות בסיס',
            ingredients: 'מרכיבים',
            instructions: 'הוראות',
            addIngredient: 'הוסף מרכיב',
            saveRecipe: 'שמור מתכון',
            cancel: 'ביטול',
            scaleToPortions: 'התאם לכמות מנות',
            selectRecipe: 'בחר מתכון להצגת פרטים',
            noRecipes: 'לא נמצאו מתכונים. הוסף את המתכון הראשון!',
            deleteRecipeConfirm: 'האם למחוק את המתכון הזה?',
            
            // Settings
            settings: 'הגדרות',
            taxRate: 'שיעור מס (%)',
            deliveryFee: 'דמי משלוח',
            currency: 'מטבע',
            saveSettings: 'שמור הגדרות',
            
            // Tables
            tables: 'שולחנות',
            tableManagement: 'ניהול שולחנות',
            addTable: 'הוסף שולחן',
            tableNumber: 'מספר שולחן',
            capacity: 'קיבולת',
            status: 'סטטוס',
            available: 'פנוי',
            occupied: 'תפוס',
            reserved: 'שמור',
            selectTable: 'בחר שולחן',
            noTables: 'אין שולחנות זמינים',
            tableOrders: 'הזמנות שולחן',
            newOrder: 'הזמנה חדשה',
            viewOrders: 'הצג הזמנות',
            closeTable: 'סגור שולחן',
            editTable: 'ערוך שולחן',
            deleteTable: 'מחק שולחן',
            location: 'מיקום',
            notes: 'הערות',
            reservation: 'הזמנה מראש',
            customerName: 'שם לקוח',
            customerPhone: 'טלפון לקוח',
            reservationTime: 'זמן הזמנה',
            makeReservation: 'בצע הזמנה מראש',
            cancelReservation: 'בטל הזמנה מראש',
            tableDetails: 'פרטי שולחן',
            tableHistory: 'היסטוריית שולחן',
            occupancyTime: 'זמן תפוסה',
            revenue: 'הכנסות',
            averageOrderValue: 'ממוצע הזמנה',
            tableStatus: 'סטטוס שולחן',
            cleaning: 'ניקוי',
            maintenance: 'תחזוקה',
            indoorArea: 'מתחם פנימי',
            coveredArea: 'מתחם מקורה',
            outdoorArea: 'מתחם חיצוני',

            // Inventory Management
            inventory: 'מלאי',
            inventoryManagement: 'ניהול מלאי',
            addInventory: 'הוסף פריט',
            editInventory: 'ערוך פריט',
            deleteInventory: 'מחק פריט',
            inventoryName: 'שם פריט',
            inventoryCategory: 'קטגוריה',
            inventoryUnit: 'יחידה',
            currentStock: 'מלאי נוכחי',
            minStock: 'מלאי מינימלי',
            maxStock: 'מלאי מקסימלי',
            cost: 'עלות',
            supplier: 'ספק',
            expiryDate: 'תאריך תפוגה',
            saveInventory: 'שמור פריט',
            purchases: 'רכישות',
            addPurchase: 'הוסף רכישה',
            editPurchase: 'ערוך רכישה',
            purchaseDate: 'תאריך רכישה',
            expectedDelivery: 'אספקה צפויה',
            totalCost: 'עלות כוללת',
            purchaseStatus: 'סטטוס',
            pending: 'ממתין',
            received: 'התקבל',
            savePurchase: 'שמור רכישה',
            suppliers: 'ספקים',
            addSupplier: 'הוסף ספק',
            editSupplier: 'ערוך ספק',
            deleteSupplier: 'מחק ספק',
            supplierName: 'שם ספק',
            contact: 'איש קשר',
            phone: 'טלפון',
            email: 'אימייל',
            address: 'כתובת',
            paymentTerms: 'תנאי תשלום',
            saveSupplier: 'שמור ספק',
            waste: 'פחת',
            addWaste: 'הוסף פחת',
            wasteQuantity: 'כמות',
            wasteReason: 'סיבה',
            wasteDate: 'תאריך',
            saveWaste: 'שמור פחת',
            inventoryReports: 'דוחות מלאי',
            stockValue: 'שווי מלאי',
            lowStock: 'מלאי נמוך',
            outOfStock: 'אזל מהמלאי',
            stockTransactions: 'תנועות מלאי',
            exportInventory: 'יצוא מלאי',
            importInventory: 'יבוא מלאי',
            searchInventory: 'חיפוש במלאי...',
            sortByStock: 'מיון לפי מלאי',
            sortByCost: 'מיון לפי עלות',
            lowStockAlerts: 'התראות מלאי נמוך',
            stock: 'מלאי',
            noInventoryItems: 'לא נמצאו פריטי מלאי',
            sortByName: 'מיון לפי שם',
            sortByCategory: 'מיון לפי קטגוריה',
            unitPiece: 'יח׳',
            unitGram: 'גרם',

            // Kitchen Display
            kdsAssignChef: 'שייך שף',
            kdsChefName: 'שם שף',
            kdsChefAssignment: 'שיוך שף',
            kdsAssignedTo: 'משויך ל',
            kdsSelectChef: 'בחר שף',
            kdsSelectStation: 'בחר תחנה',
            kdsManageChefs: 'ניהול שפים',
            kdsManageStations: 'ניהול תחנות',
            kdsAddChef: 'הוסף שף',
            kdsAddStation: 'הוסף תחנה',
            kdsName: 'שם',
            select: 'בחר',
            addChefPlaceholder: 'הוסף שף...',
            addStationPlaceholder: 'הוסף תחנה...',

            // Receipt & Print
            receipt: 'קבלה',
            printReceipt: 'הדפס קבלה',
            printOptions: 'אפשרויות הדפסה',
            print: 'הדפס',
            receiptNumber: 'מספר קבלה #',
            date: 'תאריך',
            time: 'שעה',
            server: 'מלצר',
            customer: 'לקוח',
            items: 'פריטים',
            qty: 'כמות',
            amount: 'סכום',
            serviceCharge: 'דמי שירות',
            discount: 'הנחה',
            grandTotal: 'סה״כ לתשלום',
            paymentMethod: 'אמצעי תשלום',
            cash: 'מזומן',
            card: 'כרטיס',
            change: 'עודף',
            thankYou: 'תודה רבה',
            
            // Reports
            reports: 'דוחות',
            salesReport: 'דוח מכירות',
            dailyReport: 'דוח יומי',
            monthlyReport: 'דוח חודשי',
            topItems: 'פריטים מובילים',
            categoryReport: 'דוח קטגוריות',
            exportData: 'יצוא נתונים',
            generateReport: 'הפק דוח',
            totalSales: 'סה״כ מכירות',
            totalOrders: 'סה״כ הזמנות',
            completedOrders: 'הזמנות שהושלמו',
            averageOrder: 'ממוצע הזמנה',
            
            // Backup & Settings
            backup: 'גיבוי ושחזור',
            exportBackup: 'יצא גיבוי',
            importBackup: 'יבא גיבוי',
            restoreData: 'שחזר נתונים',
            restaurantInfo: 'פרטי מסעדה',
            contactInfo: 'פרטי קשר',
            receiptSettings: 'הגדרות קבלה',
            printSettings: 'הגדרות הדפסה',
            backendSettings: 'הגדרות שרת',
            logoUpload: 'העלאת לוגו',
            receiptFooter: 'טקסט תחתון בקבלה',
            autoPrint: 'הדפסה אוטומטית',
            backendEnabled: 'שמירת הזמנות בשרת',
            backendUrl: 'כתובת השרת',
            printViaBackend: 'הדפסה דרך השרת',
            receiptWidth: 'רוחב קבלה (מ״מ)',
            fontSize: 'גודל גופן (נק׳)',
            
            // Prep Time Status Translations
            overdue: 'באיחור',
            late: 'מאוחר',
            early: 'מוקדם',
            'on-time': 'בזמן'
        },
        
        // Initialize app
        initApp() {
            // Load all data from localStorage with error handling
            this.loadRecipes();
            this.loadOrders();
            this.loadSettings();
            this.loadTables();
            this.loadChefs();
            this.loadStations();
            this.loadInventory();
            this.applyYasouDefaults();
            
            // Validate and clean data on startup
            this.validateAndCleanData();
            
            // Request notification permission
            if ('Notification' in window) {
                Notification.requestPermission();
            }
            
            // Start KDS auto-refresh if enabled
            if (this.kdsAutoRefresh) {
                this.startKdsAutoRefresh();
            }
            
            // Watch for tab changes to manage KDS auto-refresh
            this.$watch('currentTab', (newTab) => {
                if (newTab === 'kds' && this.kdsAutoRefresh) {
                    this.startKdsAutoRefresh();
                } else {
                    this.stopKdsAutoRefresh();
                }
            });
            
            // Set initial language from localStorage or browser
            let savedLang = localStorage.getItem('restaurant_lang');
            if (savedLang === 'ar') {
                savedLang = 'he';
                localStorage.setItem('restaurant_lang', 'he');
            }
            if (!localStorage.getItem('yasou_lang_initialized')) {
                savedLang = 'he';
                localStorage.setItem('restaurant_lang', 'he');
                localStorage.setItem('yasou_lang_initialized', '1');
            }
            this.language = savedLang || 'he';
            this.direction = this.language === 'he' ? 'rtl' : 'ltr';
            
            // Update translations based on language
            if (this.language === 'he') {
                this.translations = this.heTranslations;
            }
            
            // Initialize real-time sync
            this.initRealtimeSync();
            this.loadOrdersFromBackend();
        },

        applyYasouDefaults() {
            const oldDefaultNames = ['Restaurant Manager', ''];
            if (!this.settings || oldDefaultNames.includes(this.settings.restaurantName)) {
                this.settings = {
                    ...this.settings,
                    restaurantName: 'Yasou Taverna',
                    currency: 'EUR',
                    address: this.settings?.address === '123 Main Street, City, State 12345' ? 'Yasou Taverna' : this.settings?.address,
                    phone: this.settings?.phone === '+1 (555) 123-4567' ? '' : this.settings?.phone,
                    email: this.settings?.email === 'info@restaurant.com' ? '' : this.settings?.email,
                    website: this.settings?.website === 'www.restaurant.com' ? '' : this.settings?.website
                };
                this.saveSettings();
            } else if (this.settings.currency === 'USD') {
                this.settings.currency = 'EUR';
                this.saveSettings();
            }

            if (!Array.isArray(this.tables) || this.tables.length < 34 || this.tables.some(table => ['Bar', 'Dining Room', ''].includes(table.location))) {
                const existingTables = Array.isArray(this.tables) ? this.tables : [];
                this.tables = this.getYasouTablePlan().map(plan => {
                    const existing = existingTables.find(table => Number(table.number) === plan.number) || {};
                    return {
                        ...existing,
                        id: existing.id || plan.number,
                        number: plan.number,
                        capacity: plan.capacity,
                        status: existing.status || 'available',
                        location: plan.location,
                        notes: existing.notes || ''
                    };
                });
                this.saveTables();
            }

            const yasouCategories = ["Opening","Salads","Hummus","Meat & Chicken","Fish","Vegan / Vegetarian","Soft Drinks","Alcoholic Drinks","Dessert","Nargilla"];
            const alcoholSubcategories = ['Beer','Cocktails','Ouzo','Whiskey','Vodka'];

            if (Array.isArray(this.recipeCategories)) {
                const nextCategories = yasouCategories.filter(category =>
                    this.recipeCategories.includes(category) ||
                    category === 'Alcoholic Drinks' && this.recipeCategories.some(oldCategory => alcoholSubcategories.includes(oldCategory))
                );
                this.recipeCategories = nextCategories.length ? nextCategories : yasouCategories;
                this.saveRecipeCategories();
            }

            if (Array.isArray(this.recipes)) {
                const seededShabbatNames = [
                    'Shabbat dinner for one person',
                    'Shabbat dinner for a couple',
                    'Premium Shabbat Dinner for Two',
                    'Friday or Shabbat morning meal per person',
                    'Bottle of wine for Shabbat',
                    'Pair of challahs',
                    'Shabbat hot plate rental',
                    'Friday schnitzel in a bun to go'
                ];
                const demoRecipeNames = [
                    'Beef Tacos',
                    'Caesar Salad',
                    'Chicken Alfredo',
                    'Chicken Noodle Soup',
                    'Chicken Quesadilla',
                    'Chicken Wings',
                    'Chocolate Cake',
                    'Chocolate Milkshake',
                    'Classic Burger',
                    'French Fries',
                    'Garlic Bread',
                    'Greek Salad',
                    'Grilled Salmon',
                    'Margherita Pizza',
                    'Mozzarella Sticks',
                    'Onion Rings',
                    'Pepperoni Pizza',
                    'Spaghetti Carbonara',
                    'Tiramisu',
                    'Tomato Basil Soup'
                ];
                let changed = false;
                const beforeCount = this.recipes.length;
                this.recipes = this.recipes.filter(recipe => !seededShabbatNames.includes(recipe.name));
                if (this.recipes.length !== beforeCount) changed = true;
                this.recipes = this.recipes.map(recipe => {
                    if (alcoholSubcategories.includes(recipe.category)) {
                        changed = true;
                        return { ...recipe, category: 'Alcoholic Drinks' };
                    }
                    if (['Hummus with mini schnitzel', 'Hummus with minced meat'].includes(recipe.name)) {
                        const tags = Array.isArray(recipe.tags) ? recipe.tags.filter(tag => tag !== 'vegetarian') : [];
                        if (tags.length !== (recipe.tags || []).length) {
                            changed = true;
                            return { ...recipe, tags };
                        }
                    }
                    return recipe;
                });
                const isDemoRecipeList = this.recipes.length > 0 && this.recipes.every(recipe => demoRecipeNames.includes(recipe.name));
                if (this.recipes.length === 0 || isDemoRecipeList) {
                    this.recipes = this.getDefaultRecipes();
                    changed = true;
                }
                if (changed) this.saveRecipes();
            } else {
                this.recipes = this.getDefaultRecipes();
                this.saveRecipes();
            }
        },

        getYasouTablePlan() {
            const indoorCapacities = {
                1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 6, 8: 2, 9: 4,
                10: 4, 11: 4, 12: 4, 13: 4, 14: 4, 15: 2, 16: 2, 17: 2
            };
            const coveredCapacities = {
                18: 6, 19: 10, 20: 6, 21: 8, 22: 12, 23: 12, 24: 8
            };
            const outdoorCapacities = {
                25: 6, 26: 6, 27: 6, 28: 6, 29: 6, 30: 6, 31: 6, 32: 6, 33: 6, 34: 6
            };

            return [
                ...Object.entries(indoorCapacities).map(([number, capacity]) => ({ number: Number(number), capacity, location: 'מתחם פנימי' })),
                ...Object.entries(coveredCapacities).map(([number, capacity]) => ({ number: Number(number), capacity, location: 'מתחם מקורה' })),
                ...Object.entries(outdoorCapacities).map(([number, capacity]) => ({ number: Number(number), capacity, location: 'מתחם חיצוני' }))
            ].sort((a, b) => a.number - b.number);
        },

        getTableAreas() {
            return [
                {
                    key: 'outdoor',
                    label: this.translations.outdoorArea || 'מתחם חיצוני',
                    location: 'מתחם חיצוני',
                    className: 'bg-green-50 border-green-100'
                },
                {
                    key: 'covered',
                    label: this.translations.coveredArea || 'מתחם מקורה',
                    location: 'מתחם מקורה',
                    className: 'bg-blue-50 border-blue-100'
                },
                {
                    key: 'indoor',
                    label: this.translations.indoorArea || 'מתחם פנימי',
                    location: 'מתחם פנימי',
                    className: 'bg-yellow-50 border-yellow-100'
                }
            ];
        },

        getTablesByArea(area) {
            return this.tables
                .filter(table => table.location === area.location)
                .sort((a, b) => Number(a.number) - Number(b.number));
        },

        getTableAreaForNumber(tableNumber) {
            const number = Number(tableNumber);
            if (number >= 25 && number <= 34) return 'מתחם חיצוני';
            if (number >= 18 && number <= 24) return 'מתחם מקורה';
            if (number >= 1 && number <= 17) return 'מתחם פנימי';
            return '';
        },

        normalizeYasouTable(table) {
            const tableNumber = Number(table.number);
            const plan = this.getYasouTablePlan().find(item => item.number === tableNumber);

            return {
                ...table,
                number: tableNumber,
                capacity: plan?.capacity || table.capacity || 4,
                location: plan?.location || this.getTableAreaForNumber(tableNumber) || table.location || ''
            };
        },
        
        // Load recipes from localStorage
        loadRecipes() {
            const savedRecipes = localStorage.getItem('restaurant_recipes');
            this.recipes = savedRecipes ? JSON.parse(savedRecipes) : [
                {
                    id: 1,
                    name: 'Greek Salad',
                    category: 'Salad',
                    price: 12,
                    basePortions: 2,
                    ingredients: [
                        {name: 'Tomato', quantity: 150, unit: 'g'},
                        {name: 'Cucumber', quantity: 120, unit: 'g'},
                        {name: 'Feta', quantity: 80, unit: 'g'},
                        {name: 'Olives', quantity: 40, unit: 'g'}
                    ],
                    instructions: '1. Chop vegetables\n2. Add feta and olives\n3. Dress with olive oil and oregano'
                },
                {
                    id: 2,
                    name: 'Chicken Souvlaki',
                    category: 'Grill',
                    price: 18,
                    basePortions: 1,
                    ingredients: [
                        {name: 'Chicken', quantity: 220, unit: 'g'},
                        {name: 'Pita', quantity: 1, unit: 'pc'},
                        {name: 'Tzatziki', quantity: 60, unit: 'g'},
                        {name: 'Fries', quantity: 120, unit: 'g'}
                    ],
                    instructions: '1. Grill chicken skewers\n2. Warm pita\n3. Serve with tzatziki and fries'
                }
            ];
        },
        
        // Save recipes to localStorage
        saveRecipes() {
            localStorage.setItem('restaurant_recipes', JSON.stringify(this.recipes));
            // Dispatch event to sync across tabs
            window.dispatchEvent(new Event('storage'));
        },
        
        // Load orders from localStorage
        loadOrders() {
            const savedOrders = localStorage.getItem('restaurant_orders');
            this.orders = savedOrders ? JSON.parse(savedOrders) : [];
        },
        
        // Save orders to localStorage
        saveOrders() {
            try {
            localStorage.setItem('restaurant_orders', JSON.stringify(this.orders));
                // Trigger storage event for cross-tab sync
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'restaurant_orders',
                    newValue: JSON.stringify(this.orders)
                }));
            } catch (error) {
                console.error('Error saving orders:', error);
                alert('Error saving orders. Please check your browser storage.');
            }
        },

        getBackendUrl() {
            return (this.settings?.backendUrl || 'http://127.0.0.1:8001/api').replace(/\/+$/, '');
        },

        async backendRequest(path, options = {}) {
            if (this.settings?.backendEnabled === false) {
                return null;
            }

            const response = await fetch(`${this.getBackendUrl()}${path}`, {
                method: options.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(options.headers || {})
                },
                body: options.body,
                mode: 'cors'
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || 'Backend request failed');
            }

            return data;
        },

        buildBackendOrderPayload(order) {
            return {
                client_order_id: String(order.clientOrderId || order.id),
                type: order.type || 'dine-in',
                table_number: order.tableNumber || null,
                customer_name: order.customerName || null,
                guests: order.guests || null,
                subtotal: Number(order.subtotal || 0),
                tax: Number(order.tax || 0),
                delivery_fee: Number(order.deliveryFee || order.delivery_fee || 0),
                total: Number(order.total || 0),
                items: (order.items || []).map(item => ({
                    recipe_id: item.id || item.recipe_id || null,
                    name: item.name || item.nameHe || item.nameEn || 'Item',
                    name_he: item.nameHe || item.name || null,
                    price: Number(item.price || 0),
                    quantity: Number(item.quantity || 1),
                    notes: item.notes || null,
                    modifications: item.modifications || null
                })),
                notes: order.notes || null
            };
        },

        normalizeBackendOrder(order) {
            if (!order) return null;
            return {
                id: Number(order.client_order_id || order.id),
                backendId: order.id,
                clientOrderId: order.client_order_id || String(order.id),
                type: order.type,
                tableNumber: order.table_number,
                customerName: order.customer_name || '',
                guests: order.guests || null,
                items: (order.order_items || order.orderItems || []).map(item => ({
                    id: item.recipe_id || item.id,
                    name: item.name,
                    nameHe: item.name,
                    price: Number(item.price || 0),
                    quantity: Number(item.quantity || 1),
                    notes: item.notes || ''
                })),
                subtotal: Number(order.subtotal || 0),
                tax: Number(order.tax || 0),
                deliveryFee: Number(order.delivery_fee || 0),
                total: Number(order.total || 0),
                status: order.status || 'new',
                timestamp: order.created_at ? new Date(order.created_at).getTime() : Date.now(),
                backendSyncedAt: Date.now()
            };
        },

        mergeBackendOrder(backendOrder) {
            const normalized = this.normalizeBackendOrder(backendOrder);
            if (!normalized) return;

            const existingIndex = this.orders.findIndex(order =>
                String(order.clientOrderId || order.id) === String(normalized.clientOrderId)
                || Number(order.backendId) === Number(normalized.backendId)
            );

            if (existingIndex >= 0) {
                this.orders[existingIndex] = {
                    ...this.orders[existingIndex],
                    backendId: normalized.backendId,
                    clientOrderId: normalized.clientOrderId,
                    backendSyncedAt: normalized.backendSyncedAt
                };
            } else {
                this.orders.push(normalized);
            }
        },

        async loadOrdersFromBackend() {
            try {
                const response = await this.backendRequest('/orders?per_page=200');
                const orders = response?.data?.data || response?.data || [];

                if (Array.isArray(orders)) {
                    orders.forEach(order => this.mergeBackendOrder(order));
                    this.saveOrders();
                }
            } catch (error) {
                console.warn('Backend orders sync skipped:', error.message);
            }
        },

        async persistOrderToBackend(order) {
            try {
                const response = await this.backendRequest('/orders', {
                    method: 'POST',
                    body: JSON.stringify(this.buildBackendOrderPayload(order))
                });

                if (response?.data) {
                    order.backendId = response.data.id;
                    order.clientOrderId = response.data.client_order_id || order.clientOrderId || String(order.id);
                    order.backendSyncedAt = Date.now();
                    this.saveOrders();
                }
            } catch (error) {
                order.backendSyncError = error.message;
                this.saveOrders();
                console.warn('Order saved locally, backend sync failed:', error.message);
            }
        },

        async sendPrintJob(order, type = 'receipt') {
            if (this.settings?.printViaBackend === false) {
                return;
            }

            try {
                const body = order.backendId
                    ? { type, order_id: order.backendId }
                    : { type, order: this.buildBackendOrderPayload(order) };

                await this.backendRequest('/print/jobs', {
                    method: 'POST',
                    body: JSON.stringify(body)
                });
            } catch (error) {
                console.warn('Print job was not sent:', error.message);
            }
        },
        
        // Load settings from localStorage
        getDefaultSettings() {
            return {
                taxRate: 10,
                deliveryFee: 5,
                currency: 'EUR',
                restaurantName: 'Yasou Taverna',
                address: 'Yasou Taverna',
                phone: '',
                email: '',
                website: '',
                receiptFooter: 'Thank you for dining with us!',
                logo: '',
                printLogo: true,
                printHeader: true,
                printFooter: true,
                autoPrint: false,
                receiptWidth: 80,
                fontSize: 12,
                backendEnabled: true,
                backendUrl: 'http://127.0.0.1:8001/api',
                printViaBackend: true
            };
        },

        loadSettings() {
            const savedSettings = localStorage.getItem('restaurant_settings');
            this.settings = {
                ...this.getDefaultSettings(),
                ...(savedSettings ? JSON.parse(savedSettings) : {})
            };
        },
        
        // Save settings to localStorage
        saveSettings() {
            try {
            localStorage.setItem('restaurant_settings', JSON.stringify(this.settings));
                // Trigger storage event for cross-tab sync
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'restaurant_settings',
                    newValue: JSON.stringify(this.settings)
                }));
            } catch (error) {
                console.error('Error saving settings:', error);
                alert('Error saving settings. Please check your browser storage.');
            }
        },
        
        // Load tables from localStorage
        loadTables() {
            const savedTables = localStorage.getItem('restaurant_tables');
            this.tables = savedTables ? JSON.parse(savedTables) : this.getYasouTablePlan().map(plan => ({
                id: plan.number,
                number: plan.number,
                capacity: plan.capacity,
                status: 'available',
                location: plan.location,
                notes: ''
            }));
            this.tables = this.tables.map(table => this.normalizeYasouTable(table));
            this.saveTables();
        },
        
        // Save tables to localStorage
        saveTables() {
            try {
            localStorage.setItem('restaurant_tables', JSON.stringify(this.tables));
                // Trigger storage event for cross-tab sync
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'restaurant_tables',
                    newValue: JSON.stringify(this.tables)
                }));
            } catch (error) {
                console.error('Error saving tables:', error);
                alert('Error saving tables. Please check your browser storage.');
            }
        },
        
        // Load inventory from localStorage
        loadInventory() {
            const savedInventory = localStorage.getItem('restaurant_inventory');
            this.inventory = savedInventory ? JSON.parse(savedInventory) : this.getDefaultInventory();

            const demoInventoryNames = ['Pizza Dough', 'Tomato Sauce', 'Mozzarella Cheese', 'Ground Beef', 'Burger Buns'];
            if (!Array.isArray(this.inventory) || this.inventory.length === 0 || this.inventory.every(item => demoInventoryNames.includes(item.name))) {
                this.inventory = this.getDefaultInventory();
                this.saveInventory();
            }
            
            const savedSuppliers = localStorage.getItem('restaurant_suppliers');
            this.suppliers = savedSuppliers ? JSON.parse(savedSuppliers) : this.getDefaultSuppliers();

            const demoSupplierNames = ['Local Bakery', 'Italian Imports', 'Dairy Fresh', 'Premium Meats'];
            if (!Array.isArray(this.suppliers) || this.suppliers.length === 0 || this.suppliers.every(supplier => demoSupplierNames.includes(supplier.name))) {
                this.suppliers = this.getDefaultSuppliers();
                this.saveSuppliers();
            }
            
            const savedPurchases = localStorage.getItem('restaurant_purchases');
            this.purchases = savedPurchases ? JSON.parse(savedPurchases) : [];
            
            const savedWaste = localStorage.getItem('restaurant_waste');
            this.waste = savedWaste ? JSON.parse(savedWaste) : [];
            
            this.updateInventoryAlerts();
        },
        
        // Save inventory to localStorage
        saveInventory() {
            try {
                localStorage.setItem('restaurant_inventory', JSON.stringify(this.inventory));
                this.updateInventoryAlerts();
                // Trigger storage event for cross-tab sync
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'restaurant_inventory',
                    newValue: JSON.stringify(this.inventory)
                }));
            } catch (error) {
                console.error('Error saving inventory:', error);
                alert('Error saving inventory. Please check your browser storage.');
            }
        },
        
        // Save suppliers to localStorage
        saveSuppliers() {
            try {
                localStorage.setItem('restaurant_suppliers', JSON.stringify(this.suppliers));
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'restaurant_suppliers',
                    newValue: JSON.stringify(this.suppliers)
                }));
            } catch (error) {
                console.error('Error saving suppliers:', error);
                alert('Error saving suppliers. Please check your browser storage.');
            }
        },
        
        // Save purchases to localStorage
        savePurchases() {
            try {
                localStorage.setItem('restaurant_purchases', JSON.stringify(this.purchases));
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'restaurant_purchases',
                    newValue: JSON.stringify(this.purchases)
                }));
            } catch (error) {
                console.error('Error saving purchases:', error);
                alert('Error saving purchases. Please check your browser storage.');
            }
        },
        
        // Save waste to localStorage
        saveWaste() {
            try {
                localStorage.setItem('restaurant_waste', JSON.stringify(this.waste));
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'restaurant_waste',
                    newValue: JSON.stringify(this.waste)
                }));
            } catch (error) {
                console.error('Error saving waste:', error);
                alert('Error saving waste. Please check your browser storage.');
            }
        },
        
        // Change language
        changeLanguage(lang) {
            this.language = lang;
            this.direction = lang === 'he' ? 'rtl' : 'ltr';
            localStorage.setItem('restaurant_lang', lang);
            
            // Update translations based on language
            if (lang === 'he') {
                this.translations = this.heTranslations;
            } else {
                // Use the existing English translations object
                this.translations = {
                    // App
                    appTitle: 'Restaurant Manager',
                    
                    // POS
                    pos: 'POS',
                    orderType: 'Order Type',
                    dineIn: 'Dine-In',
                    takeaway: 'Takeaway',
                    delivery: 'Delivery',
                    currentOrder: 'Current Order',
                    item: 'Item',
                    total: 'Total',
                    subtotal: 'Subtotal',
                    tax: 'Tax',
                    placeOrder: 'Place Order',
                    emptyOrder: 'Add items to your order',
                    
                    // KDS
                    kds: 'Kitchen Display',
                    newOrders: 'New Orders',
                    preparing: 'Preparing',
                    ready: 'Ready',
                    startPreparing: 'Start Preparing',
                    markReady: 'Mark as Ready',
                    complete: 'Complete',
                    noNewOrders: 'No new orders',
                    noPreparingOrders: 'No orders in preparation',
                    noReadyOrders: 'No orders ready',
                    allOrders: 'All Orders',
                    allTypes: 'All Types',
                    allStations: 'All Stations',
                    sortByTime: 'By Time',
                    sortByPriority: 'By Priority',
                    sortByTable: 'By Table',
                    pendingOrders: 'Pending',
                    avgPrepTime: 'Avg Prep Time',
                    efficiency: 'Efficiency',
                    age: 'Age',
                    estimated: 'Est',
                    priority: 'Priority',
                    progress: 'Progress',
                    minutesUnit: 'm',
                    searchRecipes: 'Search recipes...',
                    selectCategory: 'Select Category',
                    sortByDate: 'Sort by Date',
                    prepTime: 'Prep Time',
                    cookTime: 'Cook Time',
                    difficulty: 'Difficulty',
                    active: 'Active',
                    availableForOrdering: 'Available for ordering',
                    ingredient: 'Ingredient',
                    quantity: 'Qty',
                    unit: 'Unit',
                    tags: 'Tags',
                    tagsPlaceholder: 'vegetarian, spicy, gluten-free',
                    notes: 'Notes',
                    duplicate: 'Duplicate',
                    unknown: 'Unknown',
                    noInstructionsAvailable: 'No instructions available',
                    noRecipesMatching: 'No recipes found matching your criteria',
                    each: 'each',
                    
                    // Enhanced KDS
                    kdsSettings: 'KDS Settings',
                    kdsView: 'KDS View',
                    kdsFilter: 'Filter Orders',
                    kdsSort: 'Sort Orders',
                    kdsAutoRefresh: 'Auto Refresh',
                    kdsSoundEnabled: 'Sound Notifications',
                    kdsNotifications: 'Browser Notifications',
                    kdsRefreshInterval: 'Refresh Interval (seconds)',
                    kdsPriorityOrders: 'Priority Orders',
                    kdsUrgentOrders: 'Urgent Orders',
                    kdsOrderTimer: 'Order Timer',
                    kdsPrepTime: 'Prep Time',
                    kdsEstimatedTime: 'Estimated Time',
                    kdsActualTime: 'Actual Time',
                    kdsTimeRemaining: 'Time Remaining',
                    kdsOverdue: 'Overdue',
                    kdsOnTime: 'On Time',
                    kdsEarly: 'Early',
                    kdsLate: 'Late',
                    kdsOrderNotes: 'Order Notes',
                    kdsSpecialInstructions: 'Special Instructions',
                    kdsAllergenInfo: 'Allergen Information',
                    kdsModifications: 'Modifications',
                    kdsUrgent: 'Urgent',
                    kdsPriority: 'Priority',
                    kdsNormal: 'Normal',
                    kdsLow: 'Low',
                    kdsOrderAge: 'Order Age',
                    kdsTimeInQueue: 'Time in Queue',
                    kdsAveragePrepTime: 'Average Prep Time',
                    kdsKitchenStats: 'Kitchen Statistics',
                    kdsOrdersPerHour: 'Orders per Hour',
                    kdsEfficiency: 'Efficiency',
                    kdsBottleneck: 'Bottleneck Items',
                    kdsPerformance: 'Performance',
                    kdsFullScreen: 'Full Screen',
                    kdsCompactView: 'Compact View',
                    kdsDetailedView: 'Detailed View',
                    kdsPrintOrder: 'Print Order',
                    kdsAssignChef: 'Assign Chef',
                    kdsChefName: 'Chef Name',
                    kdsStation: 'Station',
                    kdsStation1: 'Station 1',
                    kdsStation2: 'Station 2',
                    kdsStation3: 'Station 3',
                    kdsStation4: 'Station 4',
                    kdsAssignOrder: 'Assign Order',
                    kdsUnassignOrder: 'Unassign Order',
                    kdsOrderAssigned: 'Order Assigned',
                    kdsOrderUnassigned: 'Order Unassigned',
                    kdsMarkUrgent: 'Mark Urgent',
                    kdsUnmarkUrgent: 'Unmark Urgent',
                    kdsAddNote: 'Add Note',
                    kdsOrderNotes: 'Order Notes',
                    kdsPrepProgress: 'Prep Progress',
                    kdsKitchenEfficiency: 'Kitchen Efficiency',
                    kdsOnTimeDelivery: 'On-Time Delivery',
                    kdsUrgentOrders: 'Urgent Orders',
                    kdsPriorityOrders: 'Priority Orders',
                    kdsOrderProgress: 'Order Progress',
                    kdsTimeTracking: 'Time Tracking',
                    kdsPerformanceMetrics: 'Performance Metrics',
                    kdsRealTimeUpdates: 'Real-Time Updates',
                    kdsOrderQueue: 'Order Queue',
                    kdsKitchenFlow: 'Kitchen Flow',
                    kdsOrderManagement: 'Order Management',
                    kdsChefAssignment: 'Chef Assignment',
                    kdsStationManagement: 'Station Management',
                    kdsOrderPrioritization: 'Order Prioritization',
                    kdsTimeManagement: 'Time Management',
                    kdsQualityControl: 'Quality Control',
                    kdsKitchenAnalytics: 'Kitchen Analytics',
                    kdsAssignedTo: 'Assigned to',
                    kdsSelectChef: 'Select Chef',
                    kdsSelectStation: 'Select Station',
                    kdsSave: 'Save',
                    kdsManageChefs: 'Manage Chefs',
                    kdsManageStations: 'Manage Stations',
                    kdsAddChef: 'Add Chef',
                    kdsAddStation: 'Add Station',
                    kdsName: 'Name',
                    select: 'Select',
                    addChefPlaceholder: 'Add chef...',
                    addStationPlaceholder: 'Add station...',
                    
                    // Recipes
                    recipes: 'Recipes',
                    recipeList: 'Recipe List',
                    addRecipe: 'Add Recipe',
                    editRecipe: 'Edit Recipe',
                    recipeName: 'Recipe Name',
                    category: 'Category',
                    price: 'Price',
                    basePortions: 'Base Portions',
                    ingredients: 'Ingredients',
                    instructions: 'Instructions',
                    addIngredient: 'Add Ingredient',
                    saveRecipe: 'Save Recipe',
                    cancel: 'Cancel',
                    scaleToPortions: 'Scale to Portions',
                    selectRecipe: 'Select a recipe to view details',
                    noRecipes: 'No recipes found. Add your first recipe!',
                    deleteRecipeConfirm: 'Are you sure you want to delete this recipe?',
                    
                    // Settings
                    settings: 'Settings',
                    taxRate: 'Tax Rate (%)',
                    deliveryFee: 'Delivery Fee',
                    currency: 'Currency',
                    saveSettings: 'Save Settings',
                    
                    // Tables
                    tables: 'Tables',
                    tableManagement: 'Table Management',
                    addTable: 'Add Table',
                    tableNumber: 'Table Number',
                    capacity: 'Capacity',
                    status: 'Status',
                    available: 'Available',
                    occupied: 'Occupied',
                    reserved: 'Reserved',
                    selectTable: 'Select Table',
                    noTables: 'No tables available',
                    tableOrders: 'Table Orders',
                    newOrder: 'New Order',
                    viewOrders: 'View Orders',
                    closeTable: 'Close Table',
                    editTable: 'Edit Table',
                    deleteTable: 'Delete Table',
                    location: 'Location',
                    notes: 'Notes',
                    reservation: 'Reservation',
                    customerName: 'Customer Name',
                    customerPhone: 'Customer Phone',
                    reservationTime: 'Reservation Time',
                    makeReservation: 'Make Reservation',
                    cancelReservation: 'Cancel Reservation',
                    tableDetails: 'Table Details',
                    tableHistory: 'Table History',
                    occupancyTime: 'Occupancy Time',
                    revenue: 'Revenue',
                    averageOrderValue: 'Average Order Value',
                    tableStatus: 'Table Status',
                    cleaning: 'Cleaning',
                    maintenance: 'Maintenance',
                    indoorArea: 'Indoor Area',
                    coveredArea: 'Covered Area',
                    outdoorArea: 'Outdoor Area',
                    
                    // Receipt & Print
                    receipt: 'Receipt',
                    printReceipt: 'Print Receipt',
                    printOptions: 'Print Options',
                    print: 'Print',
                    receiptNumber: 'Receipt #',
                    date: 'Date',
                    time: 'Time',
                    server: 'Server',
                    customer: 'Customer',
                    items: 'Items',
                    qty: 'Qty',
                    amount: 'Amount',
                    serviceCharge: 'Service Charge',
                    discount: 'Discount',
                    grandTotal: 'Grand Total',
                    paymentMethod: 'Payment Method',
                    cash: 'Cash',
                    card: 'Card',
                    change: 'Change',
                    thankYou: 'Thank You',
                    
                    // Reports
                    reports: 'Reports',
                    salesReport: 'Sales Report',
                    dailyReport: 'Daily Report',
                    monthlyReport: 'Monthly Report',
                    topItems: 'Top Items',
                    categoryReport: 'Category Report',
                    exportData: 'Export Data',
                    generateReport: 'Generate Report',
                    totalSales: 'Total Sales',
                    totalOrders: 'Total Orders',
                    completedOrders: 'Completed Orders',
                    averageOrder: 'Average Order',
                    
                    // Backup & Settings
                    backup: 'Backup & Restore',
                    exportBackup: 'Export Backup',
                    importBackup: 'Import Backup',
                    restoreData: 'Restore Data',
                    restaurantInfo: 'Restaurant Information',
                    contactInfo: 'Contact Information',
                    receiptSettings: 'Receipt Settings',
                    printSettings: 'Print Settings',
                    backendSettings: 'Backend Settings',
                    logoUpload: 'Upload Logo',
                    receiptFooter: 'Receipt Footer',
                    autoPrint: 'Auto Print',
                    backendEnabled: 'Save orders to backend',
                    backendUrl: 'Backend URL',
                    printViaBackend: 'Print through backend',
                    receiptWidth: 'Receipt Width (mm)',
                    fontSize: 'Font Size (pt)'
                };
            }
        },
        
        // Format price with currency
        formatPrice(price) {
            const amount = Number(price) || 0;
            const currency = this.settings?.currency || 'EUR';

            if (currency === 'EUR') {
                const formattedAmount = new Intl.NumberFormat('en-IE', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(amount);

                return `${formattedAmount}€`;
            }

            return new Intl.NumberFormat('en-IE', {
                style: 'currency',
                currency
            }).format(amount);
        },
        
        // Format date and time
        formatDateTime(timestamp) {
            return new Date(timestamp).toLocaleTimeString();
        },
        
        // POS Functions
    addToOrder(recipe) {
        const localizedName = this.getRecipeName(recipe);

        // Check if item already exists in order
        const existingItem = this.currentOrder.items.find(item => item.id === recipe.id);
        
        if (existingItem) {
            existingItem.name = localizedName;
            existingItem.nameEn = recipe.name;
            existingItem.nameHe = recipe.nameHe || recipe.name;
            existingItem.quantity++;
        } else {
            this.currentOrder.items.push({
                id: recipe.id,
                name: localizedName,
                nameEn: recipe.name,
                nameHe: recipe.nameHe || recipe.name,
                price: recipe.price,
                quantity: 1
            });
        }
            
            this.calculateOrderTotals();
        },
        
        updateItemQuantity(index, newQuantity) {
            if (newQuantity < 1) {
                this.currentOrder.items.splice(index, 1);
            } else {
                this.currentOrder.items[index].quantity = newQuantity;
            }
            this.calculateOrderTotals();
        },
        
        removeItem(index) {
            this.currentOrder.items.splice(index, 1);
            this.calculateOrderTotals();
        },
        
        clearCurrentOrder() {
            if (confirm('Are you sure you want to clear the current order?')) {
                this.currentOrder = {
                    items: [],
                    subtotal: 0,
                    tax: 0,
                    total: 0,
                    tableNumber: null,
                    deliveryFee: 0
                };
            }
        },
        
        saveOrderAsDraft() {
            const draft = {
                ...this.currentOrder,
                id: Date.now(),
                timestamp: new Date().toISOString(),
                status: 'draft',
                type: this.orderType
            };
            
            // Save to localStorage
            const drafts = JSON.parse(localStorage.getItem('restaurant_order_drafts') || '[]');
            drafts.push(draft);
            localStorage.setItem('restaurant_order_drafts', JSON.stringify(drafts));
            
            alert('Order saved as draft successfully!');
        },
        
        calculateOrderTotals() {
            this.currentOrder.subtotal = this.currentOrder.items.reduce(
                (sum, item) => sum + (item.price * item.quantity), 0
            );
            
            // Apply tax rate from settings
            this.currentOrder.tax = this.currentOrder.subtotal * (this.settings.taxRate / 100);
            
            // Apply delivery fee if delivery order
            this.currentOrder.deliveryFee = this.orderType === 'delivery' ? this.settings.deliveryFee : 0;
            
            this.currentOrder.total = this.currentOrder.subtotal + this.currentOrder.tax + this.currentOrder.deliveryFee;
        },
        
        async placeOrder() {
            const clientOrderId = String(Date.now());
            const newOrder = {
                id: Number(clientOrderId),
                clientOrderId,
                type: this.orderType,
                tableNumber: this.currentOrder.tableNumber,
                items: [...this.currentOrder.items],
                subtotal: this.currentOrder.subtotal,
                tax: this.currentOrder.tax,
                deliveryFee: this.currentOrder.deliveryFee,
                total: this.currentOrder.total,
                status: 'new',
                timestamp: Date.now()
            };
            
            this.orders.push(newOrder);
            this.saveOrders();
            this.persistOrderToBackend(newOrder).then(() => {
                this.sendPrintJob(newOrder, 'kitchen');
            });
            
            // Automatically deduct stock from inventory
            this.deductStockFromOrder(newOrder);
            
            // Update table status if dine-in
            if (this.orderType === 'dine-in' && this.currentOrder.tableNumber) {
                const table = this.tables.find(t => t.number === this.currentOrder.tableNumber);
                if (table) {
                    table.status = 'occupied';
                    this.saveTables();
                }
            }
            
            // Play sound for new order
                    this.playKdsSound();
                    
                    // Show notification
                    this.showKdsNotification(newOrder);
            
            // Generate receipt
            this.generateReceipt(newOrder);
            
            // Reset current order
            this.currentOrder = {
                items: [],
                subtotal: 0,
                tax: 0,
                total: 0,
                tableNumber: null,
                deliveryFee: 0
            };
            
            // Switch to KDS view
            this.currentTab = 'kds';
        },
        
        // KDS Functions
        updateOrderStatus(orderId, status) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                order.status = status;
                this.saveOrders();
            }
        },
        
        completeOrder(orderId) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                order.status = 'completed';
                order.completedTime = Date.now();
            this.saveOrders();
            }
        },
        
        // Enhanced KDS Functions
        getFilteredOrders() {
            let filteredOrders = this.orders.filter(order => 
                ['new', 'preparing', 'ready'].includes(order.status)
            );
            
            // Apply filter
            if (this.kdsFilter !== 'all') {
                filteredOrders = filteredOrders.filter(order => order.type === this.kdsFilter);
            }
            
            // Apply view filter
            if (this.kdsView !== 'all') {
                filteredOrders = filteredOrders.filter(order => order.status === this.kdsView);
            }
            
            // Station filter
            if (this.kdsStationFilter && this.kdsStationFilter !== 'all') {
                filteredOrders = filteredOrders.filter(order => order.assignedStation === this.kdsStationFilter);
            }
            
            // Apply sorting
            switch(this.kdsSort) {
                case 'time':
                    filteredOrders.sort((a, b) => a.timestamp - b.timestamp);
                    break;
                case 'priority':
                    filteredOrders.sort((a, b) => this.getOrderPriority(b) - this.getOrderPriority(a));
                    break;
                case 'table':
                    filteredOrders.sort((a, b) => (a.tableNumber || 0) - (b.tableNumber || 0));
                    break;
            }
            
            return filteredOrders;
        },
        
        getOrderPriority(order) {
            const age = Date.now() - order.timestamp;
            const ageMinutes = age / (1000 * 60);
            
            // Priority based on order age and type
            let priority = 1;
            
            if (ageMinutes > 30) priority = 5; // Very urgent
            else if (ageMinutes > 20) priority = 4; // Urgent
            else if (ageMinutes > 15) priority = 3; // High
            else if (ageMinutes > 10) priority = 2; // Medium
            
            // Boost priority for delivery orders
            if (order.type === 'delivery') priority += 1;
            
            // Boost priority for large orders
            if (order.items.length > 5) priority += 1;
            
            return priority;
        },
        
        getOrderAge(order) {
            const age = Date.now() - order.timestamp;
            const minutes = Math.floor(age / (1000 * 60));
            const seconds = Math.floor((age % (1000 * 60)) / 1000);
            return { minutes, seconds };
        },
        
        getOrderAgeText(order) {
            const age = this.getOrderAge(order);
            if (age.minutes > 0) {
                return `${age.minutes}m ${age.seconds}s`;
            }
            return `${age.seconds}s`;
        },
        
        getOrderStatusColor(order) {
            const age = this.getOrderAge(order);
            const priority = this.getOrderPriority(order);
            
            if (priority >= 5 || age.minutes > 30) return 'bg-red-100 text-red-800 border-red-300';
            if (priority >= 4 || age.minutes > 20) return 'bg-orange-100 text-orange-800 border-orange-300';
            if (priority >= 3 || age.minutes > 15) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            return 'bg-blue-100 text-blue-800 border-blue-300';
        },
        
        getEstimatedPrepTime(order) {
            // Calculate estimated prep time based on items
            let totalTime = 0;
            order.items.forEach(item => {
                const recipe = this.recipes.find(r => r.id === item.id);
                if (recipe) {
                    // Base time per item (could be stored in recipe)
                    totalTime += 5 * item.quantity; // 5 minutes per item
                }
            });
            return Math.max(5, Math.min(45, totalTime)); // Between 5-45 minutes
        },
        
        getPrepTimeStatus(order) {
            const age = this.getOrderAge(order);
            const estimated = this.getEstimatedPrepTime(order);
            
            if (age.minutes > estimated + 5) return 'overdue';
            if (age.minutes > estimated) return 'late';
            if (age.minutes < estimated - 5) return 'early';
            return 'on-time';
        },
        
        assignOrderToChef(orderId, chefName, station) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                order.assignedChef = chefName;
                order.assignedStation = station;
                order.assignedTime = Date.now();
                this.saveOrders();
            }
        },
        
        unassignOrder(orderId) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                delete order.assignedChef;
                delete order.assignedStation;
                delete order.assignedTime;
                this.saveOrders();
            }
        },
        
        getKitchenStats() {
            const todayOrders = this.orders.filter(order => {
                const orderDate = new Date(order.timestamp).toDateString();
                const today = new Date().toDateString();
                return orderDate === today;
            });
            
            const completedOrders = todayOrders.filter(order => order.status === 'completed');
            const pendingOrders = todayOrders.filter(order => ['new', 'preparing', 'ready'].includes(order.status));
            
            // Calculate average prep time for completed orders
            let avgPrepTime = 0;
            if (completedOrders.length > 0) {
                const totalPrepTime = completedOrders.reduce((sum, order) => {
                    if (order.completedTime && order.timestamp) {
                        const prepTime = (order.completedTime - order.timestamp) / (1000 * 60); // Convert to minutes
                        return sum + prepTime;
                    }
                    return sum;
                }, 0);
                avgPrepTime = totalPrepTime / completedOrders.length;
            }
            
            // Calculate efficiency based on on-time completion
            let efficiency = 0;
            if (completedOrders.length > 0) {
                const onTimeOrders = completedOrders.filter(order => {
                    if (order.completedTime && order.timestamp) {
                        const actualPrepTime = (order.completedTime - order.timestamp) / (1000 * 60);
                        const estimatedPrepTime = this.getEstimatedPrepTime(order);
                        return actualPrepTime <= estimatedPrepTime;
                    }
                    return false;
                });
                efficiency = (onTimeOrders.length / completedOrders.length) * 100;
            }
            
            return {
                totalOrders: todayOrders.length,
                completedOrders: completedOrders.length,
                pendingOrders: pendingOrders.length,
                avgPrepTime: Math.round(avgPrepTime),
                efficiency: Math.round(efficiency)
            };
        },
        
        startKdsAutoRefresh() {
            if (this.kdsAutoRefresh && this.currentTab === 'kds') {
                // Clear any existing interval
                if (this.kdsRefreshTimer) {
                    clearInterval(this.kdsRefreshTimer);
                }
                
                this.kdsRefreshTimer = setInterval(() => {
                    if (this.currentTab === 'kds') {
                        // Force Alpine.js to re-render
                        this.$nextTick(() => {
                            // This will trigger a re-render
                        });
                    }
                }, this.kdsRefreshInterval * 1000);
            }
        },
        
        stopKdsAutoRefresh() {
            if (this.kdsRefreshTimer) {
                clearInterval(this.kdsRefreshTimer);
                this.kdsRefreshTimer = null;
            }
        },
        
        playKdsSound() {
            if (this.kdsSoundEnabled) {
                const audio = document.getElementById('newOrderSound');
                if (audio && audio.currentSrc) {
                    audio.play().catch(e => console.log('Audio play failed:', e));
                }
            }
        },
        
        showKdsNotification(order) {
            if (this.kdsNotifications && 'Notification' in window && Notification.permission === 'granted') {
                new Notification('New Order', {
                    body: `Order #${order.id} - ${order.items.length} items`,
                    icon: '/favicon.ico'
                });
            }
        },
        
        // Additional KDS Features
        markOrderUrgent(orderId) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                order.urgent = true;
                order.urgentTime = Date.now();
                this.saveOrders();
            }
        },
        
        unmarkOrderUrgent(orderId) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                order.urgent = false;
                delete order.urgentTime;
                this.saveOrders();
            }
        },
        
        addOrderNote(orderId, note) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                if (!order.notes) order.notes = [];
                order.notes.push({
                    text: note,
                    timestamp: Date.now(),
                    type: 'kitchen'
                });
                this.saveOrders();
            }
        },
        
        getOrderNotes(orderId) {
            const order = this.orders.find(o => o.id === orderId);
            return order?.notes || [];
        },
        
        getOrderPrepProgress(orderId) {
            const order = this.orders.find(o => o.id === orderId);
            if (!order) return 0;
            
            const age = Date.now() - order.timestamp;
            const estimated = this.getEstimatedPrepTime(order) * 60 * 1000; // Convert to milliseconds
            const progress = (age / estimated) * 100;
            return Math.min(100, Math.max(0, progress));
        },
        
        getKitchenEfficiency() {
            const todayOrders = this.orders.filter(order => {
                const orderDate = new Date(order.timestamp).toDateString();
                const today = new Date().toDateString();
                return orderDate === today;
            });
            
            const completedOrders = todayOrders.filter(order => order.status === 'completed');
            const onTimeOrders = completedOrders.filter(order => {
                const prepTime = order.completedTime ? 
                    (order.completedTime - order.timestamp) / (1000 * 60) : 0;
                const estimated = this.getEstimatedPrepTime(order);
                return prepTime <= estimated;
            });
            
            return completedOrders.length > 0 ? 
                Math.round((onTimeOrders.length / completedOrders.length) * 100) : 0;
        },
        
        // Recipe Functions
        editRecipe(recipe) {
            this.editingRecipe = recipe;
            this.recipeForm = {
                ...recipe,
                tags: recipe.tags || [],
                allergens: recipe.allergens || [],
                ingredients: recipe.ingredients || [{name: '', quantity: 0, unit: '', notes: ''}]
            };
            this.showRecipeForm = true;
        },
        
        saveRecipe() {
            // Ensure tags and allergens are arrays
            const recipeToSave = {
                ...this.recipeForm,
                tags: Array.isArray(this.recipeForm.tags) ? this.recipeForm.tags : [],
                allergens: Array.isArray(this.recipeForm.allergens) ? this.recipeForm.allergens : [],
                ingredients: Array.isArray(this.recipeForm.ingredients) ? this.recipeForm.ingredients : [{name: '', quantity: 0, unit: '', notes: ''}]
            };
            
            if (this.editingRecipe) {
                // Update existing recipe
                const index = this.recipes.findIndex(r => r.id === this.recipeForm.id);
                if (index !== -1) {
                    this.recipes[index] = recipeToSave;
                }
            } else {
                // Add new recipe
                recipeToSave.id = Date.now();
                recipeToSave.createdAt = Date.now();
                this.recipes.push(recipeToSave);
            }
            
            this.saveRecipes();
            this.showRecipeForm = false;
            this.editingRecipe = null;
            this.resetRecipeForm();
        },
        
        deleteRecipe(id) {
            if (confirm(this.translations.deleteRecipeConfirm)) {
                this.recipes = this.recipes.filter(recipe => recipe.id !== id);
                this.saveRecipes();
                this.selectedRecipe = null;
            }
        },
        
        calculateScaledQuantity(quantity, portions, basePortions) {
            return (quantity * portions / basePortions).toFixed(2);
        },
        
        // Table Management Functions
        addTable() {
            this.editingTable = null;
            this.tableForm = {
                id: null,
                number: this.tables.length + 1,
                capacity: 4,
                status: 'available',
                location: '',
                notes: '',
                reservationTime: null,
                customerName: '',
                customerPhone: ''
            };
            this.showTableForm = true;
        },
        
        editTable(table) {
            this.editingTable = table;
            this.tableForm = { ...table };
            this.showTableForm = true;
        },
        
        saveTable() {
            if (this.editingTable) {
                // Update existing table
                const index = this.tables.findIndex(t => t.id === this.tableForm.id);
                if (index !== -1) {
                    this.tables[index] = { ...this.tableForm };
                }
            } else {
                // Add new table
                this.tableForm.id = Date.now();
                this.tables.push({ ...this.tableForm });
            }
            
            this.saveTables();
            this.showTableForm = false;
            this.editingTable = null;
            this.tableForm = {
                id: null,
                number: '',
                capacity: 4,
                status: 'available',
                location: '',
                notes: '',
                reservationTime: null,
                customerName: '',
                customerPhone: ''
            };
        },
        
        deleteTable(id) {
            if (confirm(this.translations.deleteTableConfirm)) {
                this.tables = this.tables.filter(table => table.id !== id);
                this.saveTables();
            }
        },
        
        selectTable(tableNumber) {
            this.currentOrder.tableNumber = tableNumber;
            this.selectedTable = tableNumber;
        },
        
        makeReservation(tableId) {
            const table = this.tables.find(t => t.id === tableId);
            if (table) {
                table.status = 'reserved';
                this.saveTables();
            }
        },
        
        cancelReservation(tableId) {
            const table = this.tables.find(t => t.id === tableId);
            if (table) {
                table.status = 'available';
                table.reservationTime = null;
                table.customerName = '';
                table.customerPhone = '';
                this.saveTables();
            }
        },
        
        getTableRevenue(tableNumber) {
            const tableOrders = this.orders.filter(order => 
                order.tableNumber === tableNumber && order.status === 'completed'
            );
            return tableOrders.reduce((sum, order) => sum + order.total, 0);
        },
        
        getTableAverageOrder(tableNumber) {
            const tableOrders = this.orders.filter(order => 
                order.tableNumber === tableNumber && order.status === 'completed'
            );
            if (tableOrders.length === 0) return 0;
            const totalRevenue = tableOrders.reduce((sum, order) => sum + order.total, 0);
            return totalRevenue / tableOrders.length;
        },
        
        getTableOccupancyTime(tableNumber) {
            const tableOrders = this.orders.filter(order => 
                order.tableNumber === tableNumber
            );
            if (tableOrders.length === 0) return 0;
            
            // Calculate total time from first order to last completion
            const firstOrder = tableOrders.reduce((earliest, order) => 
                order.timestamp < earliest.timestamp ? order : earliest
            );
            const lastOrder = tableOrders.reduce((latest, order) => 
                order.timestamp > latest.timestamp ? order : latest
            );
            
            return Math.round((lastOrder.timestamp - firstOrder.timestamp) / (1000 * 60)); // minutes
        },
        
        getTableOrders(tableNumber) {
            return this.orders.filter(order => 
                order.tableNumber === tableNumber && 
                ['new', 'preparing', 'ready'].includes(order.status)
            );
        },
        
        closeTable(tableNumber) {
            // Complete all orders for this table
            this.orders = this.orders.filter(order => order.tableNumber !== tableNumber);
            this.saveOrders();
            
            // Mark table as available
            const table = this.tables.find(t => t.number === tableNumber);
            if (table) {
                table.status = 'available';
                this.saveTables();
            }
            
            // Clear current order if it's for this table
            if (this.currentOrder.tableNumber === tableNumber) {
                this.currentOrder = {
                    items: [],
                    subtotal: 0,
                    tax: 0,
                    total: 0,
                    tableNumber: null,
                    deliveryFee: 0
                };
                this.selectedTable = null;
            }
        },
        
        getTableStatusColor(status) {
            switch(status) {
                case 'available': return 'bg-green-100 text-green-800';
                case 'occupied': return 'bg-red-100 text-red-800';
                case 'reserved': return 'bg-yellow-100 text-yellow-800';
                case 'cleaning': return 'bg-blue-100 text-blue-800';
                case 'maintenance': return 'bg-purple-100 text-purple-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        },
        
        // Receipt & Print Functions
        generateReceipt(order) {
            this.currentReceipt = {
                ...order,
                receiptNumber: 'R' + Date.now(),
                printDate: new Date().toLocaleDateString(),
                printTime: new Date().toLocaleTimeString(),
                server: 'Server 1'
            };
            this.showReceipt = true;
            
            if (this.settings.autoPrint) {
                setTimeout(() => this.printReceipt(), 500);
            }
        },
        
        printReceipt() {
            if (this.currentReceipt) {
                this.sendPrintJob(this.currentReceipt, 'receipt');
            }

            const printWindow = window.open('', '_blank');
            const receiptContent = this.generateReceiptHTML();
            const isRtl = this.direction === 'rtl';
            
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="${this.language || 'en'}" dir="${isRtl ? 'rtl' : 'ltr'}">
                <head>
                    <title>${this.translations.receipt || 'Receipt'}</title>
                    <style>
                        body { 
                            font-family: 'Courier New', monospace; 
                            margin: 0; 
                            padding: 10px; 
                            font-size: ${this.settings.fontSize}pt;
                            width: ${this.settings.receiptWidth}mm;
                            direction: ${isRtl ? 'rtl' : 'ltr'};
                            text-align: ${isRtl ? 'right' : 'left'};
                        }
                        .receipt { direction: ${isRtl ? 'rtl' : 'ltr'}; text-align: center; }
                        .header { margin-bottom: 10px; }
                        .logo { max-width: 60px; max-height: 60px; margin: 0 auto 10px; }
                        .title { font-size: 16pt; font-weight: bold; margin: 5px 0; }
                        .info { font-size: 10pt; margin: 2px 0; }
                        .divider { border-top: 1px dashed #000; margin: 10px 0; }
                        .items { direction: ${isRtl ? 'rtl' : 'ltr'}; text-align: ${isRtl ? 'right' : 'left'}; margin: 10px 0; }
                        .item {
                            display: grid;
                            grid-template-columns: 1fr auto;
                            gap: 12px;
                            align-items: start;
                            margin: 3px 0;
                        }
                        .item-main { text-align: ${isRtl ? 'right' : 'left'}; unicode-bidi: plaintext; }
                        .item-price { text-align: ${isRtl ? 'left' : 'right'}; direction: ltr; unicode-bidi: isolate; white-space: nowrap; }
                        .totals { text-align: ${isRtl ? 'left' : 'right'}; margin: 10px 0; }
                        .total-line { margin: 2px 0; }
                        .grand-total { font-weight: bold; font-size: 14pt; }
                        .footer { margin-top: 15px; font-size: 10pt; }
                        .ltr { direction: ltr; unicode-bidi: isolate; display: inline-block; }
                        @media print {
                            body { width: 100%; }
                        }
                    </style>
                </head>
                <body>
                    ${receiptContent}
                </body>
                </html>
            `);
            
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        },
        
        generateReceiptHTML() {
            const receipt = this.currentReceipt;
            if (!receipt) {
                return '<div class="receipt">No receipt data available</div>';
            }
            const isRtl = this.direction === 'rtl';
            const valueClass = isRtl ? ' class="ltr"' : '';
            const defaultRestaurantNames = ['', 'Restaurant', 'My Restaurant', 'Yasou Taverna'];
            const restaurantName = this.language === 'he' && defaultRestaurantNames.includes(this.settings.restaurantName || '')
                ? 'יאסו טברנה רודוס'
                : (this.settings.restaurantName || 'Yasou Taverna');
            
            let html = '<div class="receipt">';
            
            // Header
            if (this.settings.printHeader) {
                if (this.settings.printLogo && this.settings.logo) {
                    html += `<img src="${this.settings.logo}" class="logo" alt="Logo">`;
                }
                html += `<div class="title">${restaurantName}</div>`;
                html += `<div class="info"><span class="ltr">${this.settings.address || ''}</span></div>`;
                html += `<div class="info"><span class="ltr">${this.settings.phone || ''}</span></div>`;
                html += `<div class="info"><span class="ltr">${this.settings.email || ''}</span></div>`;
                html += '<div class="divider"></div>';
            }
            
            // Receipt Info
            html += `<div class="info">${this.translations.receiptNumber || 'Receipt #'} <span${valueClass}>${receipt.receiptNumber || 'N/A'}</span></div>`;
            html += `<div class="info">${this.translations.date || 'Date'}: <span${valueClass}>${receipt.printDate || new Date().toLocaleDateString()}</span></div>`;
            html += `<div class="info">${this.translations.time || 'Time'}: <span${valueClass}>${receipt.printTime || new Date().toLocaleTimeString()}</span></div>`;
            if (receipt.tableNumber) {
                html += `<div class="info">${this.translations.tableNumber || 'Table'}: <span${valueClass}>${receipt.tableNumber}</span></div>`;
            }
            html += `<div class="info">${this.translations.orderType || 'Order Type'}: ${this.translations[receipt.type] || receipt.type}</div>`;
            html += '<div class="divider"></div>';
            
            // Items
            html += '<div class="items">';
            if (receipt.items && Array.isArray(receipt.items)) {
            receipt.items.forEach(item => {
                const itemName = this.getOrderItemName ? this.getOrderItemName(item) : (item.name || 'Unknown Item');
                html += `
                    <div class="item">
                        <div class="item-main"><span class="ltr">${item.quantity || 0}</span> ${itemName}</div>
                        <div class="item-price">${this.formatPrice((item.price || 0) * (item.quantity || 0))}</div>
                    </div>
                `;
            });
            }
            html += '</div>';
            
            html += '<div class="divider"></div>';
            
            // Totals
            html += '<div class="totals">';
            html += `<div class="total-line">${this.translations.subtotal || 'Subtotal'}: <span class="ltr">${this.formatPrice(receipt.subtotal || 0)}</span></div>`;
            html += `<div class="total-line">${this.translations.tax || 'Tax'}: <span class="ltr">${this.formatPrice(receipt.tax || 0)}</span></div>`;
            if (receipt.deliveryFee > 0) {
                html += `<div class="total-line">${this.translations.deliveryFee || 'Delivery Fee'}: <span class="ltr">${this.formatPrice(receipt.deliveryFee || 0)}</span></div>`;
            }
            html += `<div class="total-line grand-total">${this.translations.grandTotal || 'Grand Total'}: <span class="ltr">${this.formatPrice(receipt.total || 0)}</span></div>`;
            html += '</div>';
            
            // Footer
            if (this.settings.printFooter) {
                html += '<div class="divider"></div>';
                html += `<div class="footer">${this.settings.receiptFooter || 'Thank you for your business!'}</div>`;
            }
            
            html += '</div>';
            return html;
        },
        
        // Report Functions
        generateReports() {
            this.generateDailyReport();
            this.generateMonthlyReport();
            this.generateTopItems();
            this.generateCategoryReport();
            this.generateOrderTypeReport();
            this.generateHourlyReport();
        },
        
        generateDailyReport() {
            const today = new Date().toDateString();
            const todayOrders = this.orders.filter(order => 
                new Date(order.timestamp).toDateString() === today
            );
            
            const completedOrders = todayOrders.filter(order => order.status === 'completed');
            const totalSales = todayOrders.reduce((sum, order) => sum + order.total, 0);
            const totalTax = todayOrders.reduce((sum, order) => sum + order.tax, 0);
            const totalDeliveryFees = todayOrders.filter(order => order.type === 'delivery')
                .reduce((sum, order) => sum + order.deliveryFee, 0);
            
            this.reports.dailySales = {
                date: today,
                totalSales: totalSales,
                totalOrders: todayOrders.length,
                completedOrders: completedOrders.length,
                averageOrder: todayOrders.length > 0 ? totalSales / todayOrders.length : 0,
                totalTax: totalTax,
                totalDeliveryFees: totalDeliveryFees,
                netSales: totalSales - totalTax - totalDeliveryFees,
                completionRate: todayOrders.length > 0 ? (completedOrders.length / todayOrders.length) * 100 : 0
            };
        },
        
        generateMonthlyReport() {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const monthOrders = this.orders.filter(order => {
                const orderDate = new Date(order.timestamp);
                return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
            });
            
            const completedOrders = monthOrders.filter(order => order.status === 'completed');
            const totalSales = monthOrders.reduce((sum, order) => sum + order.total, 0);
            const totalTax = monthOrders.reduce((sum, order) => sum + order.tax, 0);
            const totalDeliveryFees = monthOrders.filter(order => order.type === 'delivery')
                .reduce((sum, order) => sum + order.deliveryFee, 0);
            
            this.reports.monthlySales = {
                month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                totalSales: totalSales,
                totalOrders: monthOrders.length,
                completedOrders: completedOrders.length,
                averageOrder: monthOrders.length > 0 ? totalSales / monthOrders.length : 0,
                totalTax: totalTax,
                totalDeliveryFees: totalDeliveryFees,
                netSales: totalSales - totalTax - totalDeliveryFees,
                completionRate: monthOrders.length > 0 ? (completedOrders.length / monthOrders.length) * 100 : 0,
                averageDailySales: monthOrders.length > 0 ? totalSales / new Date(currentYear, currentMonth + 1, 0).getDate() : 0
            };
        },
        
        generateTopItems() {
            const itemStats = {};
            
            this.orders.forEach(order => {
                order.items.forEach(item => {
                    if (!itemStats[item.name]) {
                        itemStats[item.name] = {
                            name: item.name,
                            quantity: 0,
                            revenue: 0,
                            orders: 0
                        };
                    }
                    itemStats[item.name].quantity += item.quantity;
                    itemStats[item.name].revenue += item.price * item.quantity;
                    itemStats[item.name].orders += 1;
                });
            });
            
            this.reports.topItems = Object.values(itemStats)
                .sort((a, b) => b.quantity - a.quantity)
                .slice(0, 10)
                .map(item => ({
                    ...item,
                    averagePrice: item.quantity > 0 ? item.revenue / item.quantity : 0
                }));
        },
        
        generateCategoryReport() {
            const categoryStats = {};
            
            this.orders.forEach(order => {
                order.items.forEach(item => {
                    const recipe = this.recipes.find(r => r.id === item.id);
                    if (recipe) {
                        if (!categoryStats[recipe.category]) {
                            categoryStats[recipe.category] = {
                                category: recipe.category,
                                sales: 0,
                                quantity: 0,
                                orders: 0
                            };
                        }
                        categoryStats[recipe.category].sales += item.price * item.quantity;
                        categoryStats[recipe.category].quantity += item.quantity;
                        categoryStats[recipe.category].orders += 1;
                    }
                });
            });
            
            this.reports.categorySales = Object.values(categoryStats)
                .sort((a, b) => b.sales - a.sales)
                .map(cat => ({
                    ...cat,
                    averageOrderValue: cat.orders > 0 ? cat.sales / cat.orders : 0
                }));
        },
        
        generateOrderTypeReport() {
            const typeStats = {};
            
            this.orders.forEach(order => {
                if (!typeStats[order.type]) {
                    typeStats[order.type] = {
                        type: order.type,
                        orders: 0,
                        sales: 0,
                        averageOrder: 0
                    };
                }
                typeStats[order.type].orders += 1;
                typeStats[order.type].sales += order.total;
            });
            
            // Calculate averages
            Object.values(typeStats).forEach(stat => {
                stat.averageOrder = stat.orders > 0 ? stat.sales / stat.orders : 0;
            });
            
            this.reports.orderTypeSales = Object.values(typeStats)
                .sort((a, b) => b.sales - a.sales);
        },
        
        generateHourlyReport() {
            const hourlyStats = {};
            
            // Initialize all hours
            for (let i = 0; i < 24; i++) {
                hourlyStats[i] = {
                    hour: i,
                    orders: 0,
                    sales: 0,
                    averageOrder: 0
                };
            }
            
            this.orders.forEach(order => {
                const hour = new Date(order.timestamp).getHours();
                hourlyStats[hour].orders += 1;
                hourlyStats[hour].sales += order.total;
            });
            
            // Calculate averages
            Object.values(hourlyStats).forEach(stat => {
                stat.averageOrder = stat.orders > 0 ? stat.sales / stat.orders : 0;
            });
            
            this.reports.hourlySales = Object.values(hourlyStats)
                .filter(stat => stat.orders > 0) // Only show hours with orders
                .sort((a, b) => b.sales - a.sales);
        },
        
        // Backup & Export Functions
        exportBackup() {
            const backup = {
                recipes: this.recipes,
                orders: this.orders,
                tables: this.tables,
                settings: this.settings,
                exportDate: new Date().toISOString()
            };
            
            const dataStr = JSON.stringify(backup, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `restaurant_backup_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            URL.revokeObjectURL(url);
        },
        
        importBackup(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const backup = JSON.parse(e.target.result);
                        if (confirm('This will replace all current data. Are you sure?')) {
                            this.recipes = backup.recipes || [];
                            this.orders = backup.orders || [];
                            this.tables = backup.tables || [];
                            this.settings = { ...this.settings, ...backup.settings };
                            
                            this.saveRecipes();
                            this.saveOrders();
                            this.saveTables();
                            this.saveSettings();
                            
                            alert('Backup restored successfully!');
                        }
                    } catch (error) {
                        alert('Invalid backup file!');
                    }
                };
                reader.readAsText(file);
            }
        },
        
        exportData() {
            const data = {
                recipes: this.recipes,
                orders: this.orders,
                reports: this.reports
            };
            
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `restaurant_data_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            URL.revokeObjectURL(url);
        },
        
        assignOrderToChefStation(orderId, chefName, stationName) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                order.assignedChef = chefName;
                order.assignedStation = stationName;
                order.assignedTime = Date.now();
                this.saveOrders();
                this.showChefAssignModal = false;
                this.chefAssignOrderId = null;
                this.chefAssignName = '';
                this.chefAssignStation = '';
            }
        },
        unassignOrderChefStation(orderId) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                delete order.assignedChef;
                delete order.assignedStation;
                delete order.assignedTime;
                this.saveOrders();
            }
        },
        // Real-time sync for orders/chefs/stations
        initRealtimeSync() {
            window.addEventListener('storage', (e) => {
                try {
                    if (e.key === 'restaurant_orders') {
                        this.orders = JSON.parse(e.newValue || '[]');
                    }
                    if (e.key === 'restaurant_tables') {
                        this.tables = JSON.parse(e.newValue || '[]').map(table => this.normalizeYasouTable(table));
                    }
                    if (e.key === 'restaurant_chefs') {
                        this.chefs = JSON.parse(e.newValue || '[]').map(chef => this.normalizeChef(chef));
                    }
                    if (e.key === 'restaurant_stations') {
                        this.stations = JSON.parse(e.newValue || '[]');
                    }
                    if (e.key === 'restaurant_recipes') {
                        this.recipes = JSON.parse(e.newValue || '[]');
                    }
                    if (e.key === 'restaurant_settings') {
                        this.settings = { ...this.settings, ...JSON.parse(e.newValue || '{}') };
                    }
                    if (e.key === 'restaurant_recipe_categories') {
                        this.recipeCategories = JSON.parse(e.newValue || '[]');
                    }
                } catch (error) {
                    console.error('Error syncing data:', error);
                }
            });
        },
        saveChefs() {
            try {
                this.chefs = this.chefs.map(chef => this.normalizeChef(chef));
                localStorage.setItem('restaurant_chefs', JSON.stringify(this.chefs));
                // Trigger storage event for cross-tab sync
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'restaurant_chefs',
                    newValue: JSON.stringify(this.chefs)
                }));
            } catch (error) {
                console.error('Error saving chefs:', error);
                alert('Error saving chefs. Please check your browser storage.');
            }
        },
        saveStations() {
            try {
                localStorage.setItem('restaurant_stations', JSON.stringify(this.stations));
                // Trigger storage event for cross-tab sync
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'restaurant_stations',
                    newValue: JSON.stringify(this.stations)
                }));
            } catch (error) {
                console.error('Error saving stations:', error);
                alert('Error saving stations. Please check your browser storage.');
            }
        },
        addChef() {
            const chefName = (this.newChefName || '').trim();
            if (chefName && !this.chefs.some(c => c.name === chefName)) {
                this.chefs.push({ name: chefName });
                this.newChefName = '';
                this.saveChefs();
            }
        },
        removeChef(idx) {
            this.chefs.splice(idx, 1);
            this.saveChefs();
        },
        addStation() {
            if (this.newStationName && !this.stations.some(s => s.name === this.newStationName)) {
                this.stations.push({ name: this.newStationName });
                this.newStationName = '';
                this.saveStations();
            }
        },
        removeStation(idx) {
            this.stations.splice(idx, 1);
            this.saveStations();
        },
        // Enhanced Recipe Management Functions
        getRecipeName(recipe) {
            return this.language === 'he' && recipe.nameHe ? recipe.nameHe : recipe.name;
        },

        getRecipeImage(recipe) {
            if (recipe?.image) {
                if (recipe.image === 'images/fish-01.png') {
                    return 'images/menu/food/Sea-Bream-Dorade.png';
                }

                return recipe.image;
            }

            const imageFromMap = window.menuImageMap?.[this.getRecipeImageKey(recipe)];
            if (imageFromMap) {
                return imageFromMap;
            }

            if (recipe?.name === 'Sea bream - Dorade' || recipe?.nameHe === 'דניס / צ׳יפורה') {
                return 'images/menu/food/Sea-Bream-Dorade.png';
            }

            return '';
        },

        getRecipeImageKey(recipe) {
            const specialNames = {
                'Cola / Zero': 'Coke-Zero',
                'Sprite / Zero': 'Sprite-Zero',
                'Water / Soda': 'Water-Soda',
                'Juices: Orange / Lemonade / Cherry': 'Juices-Orange-Lemonade-Cherry',
                'Sea bream - Dorade': 'Sea-Bream-Dorade',
                'Sea bass - Loup de mer': 'Sea-Bass-Loup-De-Mer'
            };
            const englishName = recipe?.name || '';

            if (specialNames[englishName]) {
                return specialNames[englishName];
            }

            return englishName
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/&/g, 'and')
                .replace(/[^a-zA-Z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .replace(/-{2,}/g, '-');
        },

        getRecipeImageFolder(recipe) {
            const category = recipe?.category || '';

            if (category === 'Soft Drinks') {
                return 'images/menu/drinks';
            }

            if (category === 'Alcoholic Drinks') {
                return 'images/menu/alcohol';
            }

            return 'images/menu/food';
        },

        getOrderItemName(item) {
            if (this.language === 'he') {
                return item.nameHe || item.name || item.nameEn || '';
            }

            return item.nameEn || item.name || item.nameHe || '';
        },

        getCategoryLabel(category) {
            const labels = {
                'Opening': 'פתיחה',
                'Salads': 'סלטים',
                'Hummus': 'חומוס',
                'Meat & Chicken': 'בשר ועוף',
                'Fish': 'דגים',
                'Vegan / Vegetarian': 'טבעוני / צמחוני',
                'Soft Drinks': 'שתייה קלה',
                'Alcoholic Drinks': 'שתיה חריפה',
                'Nargilla': 'נרגילה',
                'Dessert': 'קינוח'
            };
            return this.language === 'he' ? (labels[category] || category) : category;
        },

        getStationLabel(station) {
            const labels = {
                Grill: 'גריל',
                Fry: 'טיגון',
                Salad: 'סלטים',
                Dessert: 'קינוחים'
            };

            return this.language === 'he' ? (labels[station] || station) : station;
        },

        normalizeChef(chef) {
            const chefName = typeof chef === 'string' ? chef : (chef?.name || '');
            const chefNameEn = typeof chef === 'object' ? chef?.nameEn : null;
            const labels = {
                'Chef Anna': { name: 'אבישג', nameEn: 'Chef Avishag' },
                'Chef Avishag': { name: 'אבישג', nameEn: 'Chef Avishag' },
                'Avishag': { name: 'אבישג', nameEn: 'Chef Avishag' },
                'Chef Ben': { name: 'בן', nameEn: 'Chef Ben' },
                'Ben': { name: 'בן', nameEn: 'Chef Ben' },
                'Chef Carlos': { name: 'קרלוס', nameEn: 'Chef Carlos' },
                'Carlos': { name: 'קרלוס', nameEn: 'Chef Carlos' },
                'אבישג': { name: 'אבישג', nameEn: 'Chef Avishag' },
                'בן': { name: 'בן', nameEn: 'Chef Ben' },
                'קרלוס': { name: 'קרלוס', nameEn: 'Chef Carlos' }
            };
            const normalized = labels[chefName] || { name: chefName, nameEn: chefNameEn || chefName };

            return {
                ...(typeof chef === 'object' ? chef : {}),
                name: normalized.name,
                nameEn: chefNameEn || normalized.nameEn
            };
        },

        getChefLabel(chef) {
            const normalizedChef = this.normalizeChef(chef);

            return this.language === 'he'
                ? (normalizedChef.name || '')
                : (normalizedChef.nameEn || normalizedChef.name || '');
        },

        getTagLabel(tag) {
            const labels = {
                starter: 'פתיחה',
                vegetarian: 'צמחוני',
                healthy: 'בריא',
                popular: 'פופולרי',
                beverage: 'שתייה',
                spicy: 'חריף',
                sweet: 'מתוק',
                classic: 'קלאסי',
                premium: 'פרימיום',
                quick: 'מהיר',
                creamy: 'קרמי',
                comfort: 'מנחם',
                garlic: 'שום',
                cheesy: 'גבינתי',
                crispy: 'קריספי',
                italian: 'איטלקי'
            };
            return this.language === 'he' ? (labels[tag] || tag) : tag;
        },

        getDifficultyLabel(difficulty) {
            const labels = {
                easy: 'קל',
                medium: 'בינוני',
                hard: 'מורכב'
            };
            return this.language === 'he' ? (labels[difficulty] || difficulty || '') : (difficulty || '');
        },

        getMenuCategoryOrder(category) {
            const order = this.recipeCategories.indexOf(category);
            return order === -1 ? 999 : order;
        },

        getFilteredRecipes() {
            let filteredRecipes = this.recipes.filter(recipe => recipe.isActive !== false);
            
            // Determine which search term to use based on current tab
            const searchTerm = this.currentTab === 'pos' ? this.posSearchTerm : this.recipeSearchTerm;
            const filterCategory = this.currentTab === 'pos' ? this.posFilterCategory : this.recipeFilterCategory;
            const sortBy = this.currentTab === 'pos' ? this.posSortBy : this.recipeSortBy;
            const activeCategory = this.currentTab === 'pos' ? this.posActiveCategory : 'all';
            const quickFilter = this.currentTab === 'pos' ? this.posQuickFilter : 'all';
            
            // Apply search filter
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                filteredRecipes = filteredRecipes.filter(recipe => 
                    this.getRecipeName(recipe).toLowerCase().includes(searchLower) ||
                    recipe.name.toLowerCase().includes(searchLower) ||
                    (recipe.nameHe && recipe.nameHe.toLowerCase().includes(searchLower)) ||
                    this.getCategoryLabel(recipe.category).toLowerCase().includes(searchLower) ||
                    recipe.category.toLowerCase().includes(searchLower) ||
                    (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
                    (recipe.ingredients && recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchLower)))
                );
            }
            
            // Apply category filter
            if (filterCategory !== 'all') {
                filteredRecipes = filteredRecipes.filter(recipe => 
                    recipe.category === filterCategory
                );
            }
            
            // Apply active category filter (for POS tabs)
            if (activeCategory !== 'all') {
                filteredRecipes = filteredRecipes.filter(recipe => 
                    recipe.category === activeCategory
                );
            }
            
            // Apply quick filters (POS only)
            if (this.currentTab === 'pos' && quickFilter !== 'all') {
                switch (quickFilter) {
                    case 'popular':
                        // Filter by popular tags or high-priced items
                        filteredRecipes = filteredRecipes.filter(recipe => 
                            (recipe.tags && recipe.tags.includes('popular')) ||
                            recipe.price > 15
                        );
                        break;
                    case 'vegetarian':
                        filteredRecipes = filteredRecipes.filter(recipe => 
                            recipe.tags && recipe.tags.includes('vegetarian')
                        );
                        break;
                    case 'spicy':
                        filteredRecipes = filteredRecipes.filter(recipe => 
                            recipe.tags && recipe.tags.includes('spicy')
                        );
                        break;
                    case 'healthy':
                        filteredRecipes = filteredRecipes.filter(recipe => 
                            recipe.tags && recipe.tags.includes('healthy')
                        );
                        break;
                }
            }
            
            // Apply sorting
            filteredRecipes.sort((a, b) => {
                let aValue, bValue;
                
                switch(sortBy) {
                    case 'menu':
                        aValue = this.getMenuCategoryOrder(a.category);
                        bValue = this.getMenuCategoryOrder(b.category);
                        if (aValue === bValue) {
                            return (a.id || 0) - (b.id || 0);
                        }
                        break;
                    case 'name':
                        aValue = this.getRecipeName(a).toLowerCase();
                        bValue = this.getRecipeName(b).toLowerCase();
                        break;
                    case 'price':
                        aValue = a.price;
                        bValue = b.price;
                        break;
                    case 'popularity':
                        // Sort by tags containing 'popular' or by price
                        aValue = (a.tags && a.tags.includes('popular')) ? 1 : 0;
                        bValue = (b.tags && b.tags.includes('popular')) ? 1 : 0;
                        if (aValue === bValue) {
                            aValue = a.price;
                            bValue = b.price;
                        }
                        break;
                    case 'category':
                        aValue = this.getCategoryLabel(a.category).toLowerCase();
                        bValue = this.getCategoryLabel(b.category).toLowerCase();
                        break;
                    case 'date':
                        aValue = a.createdAt || 0;
                        bValue = b.createdAt || 0;
                        break;
                    default:
                        aValue = this.getRecipeName(a).toLowerCase();
                        bValue = this.getRecipeName(b).toLowerCase();
                }
                
                const sortOrder = this.currentTab === 'pos' ? 'asc' : this.recipeSortOrder;
                if (sortOrder === 'desc') {
                    return aValue < bValue ? 1 : -1;
                } else {
                    return aValue > bValue ? 1 : -1;
                }
            });
            
            return filteredRecipes;
        },
        
        addRecipeCategory(category) {
            if (category && !this.recipeCategories.includes(category)) {
                this.recipeCategories.push(category);
                this.saveRecipeCategories();
            }
        },
        
        removeRecipeCategory(category) {
            const index = this.recipeCategories.indexOf(category);
            if (index > -1) {
                this.recipeCategories.splice(index, 1);
                this.saveRecipeCategories();
            }
        },
        
        saveRecipeCategories() {
            localStorage.setItem('restaurant_recipe_categories', JSON.stringify(this.recipeCategories));
        },
        
        loadRecipeCategories() {
            const savedCategories = localStorage.getItem('restaurant_recipe_categories');
            if (savedCategories) {
                this.recipeCategories = JSON.parse(savedCategories);
            }
        },
        
        // Enhanced recipe save with timestamps and validation
        saveRecipe() {
            // Validate required fields
            if (!this.recipeForm.name.trim() || !this.recipeForm.category.trim() || this.recipeForm.price <= 0) {
                alert('Please fill in all required fields (name, category, price)');
                return;
            }
            
            const now = Date.now();
            
            if (this.editingRecipe) {
                // Update existing recipe
                const index = this.recipes.findIndex(r => r.id === this.recipeForm.id);
                if (index !== -1) {
                    this.recipes[index] = {
                        ...this.recipeForm,
                        updatedAt: now
                    };
                }
            } else {
                // Add new recipe
                this.recipeForm.id = now;
                this.recipeForm.createdAt = now;
                this.recipeForm.updatedAt = now;
                this.recipes.push({...this.recipeForm});
            }
            
            this.saveRecipes();
            this.showRecipeForm = false;
            this.editingRecipe = null;
            this.resetRecipeForm();
        },
        
        resetRecipeForm() {
            this.recipeForm = {
                id: null,
                name: '',
                category: '',
                price: 0,
                basePortions: 4,
                prepTime: 15,
                cookTime: 20,
                difficulty: 'medium',
                allergens: [],
                tags: [],
                ingredients: [
                    {name: '', quantity: 0, unit: '', notes: ''}
                ],
                instructions: '',
                notes: '',
                image: '',
                isActive: true,
                createdAt: null,
                updatedAt: null
            };
        },
        
        duplicateRecipe(recipe) {
            const duplicatedRecipe = {
                ...recipe,
                id: Date.now(),
                name: recipe.name + ' (Copy)',
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            this.recipes.push(duplicatedRecipe);
            this.saveRecipes();
        },
        
        toggleRecipeActive(recipeId) {
            const recipe = this.recipes.find(r => r.id === recipeId);
            if (recipe) {
                recipe.isActive = !recipe.isActive;
                recipe.updatedAt = Date.now();
                this.saveRecipes();
            }
        },
        
        // Enhanced localStorage functions with better error handling
        saveRecipes() {
            try {
                localStorage.setItem('restaurant_recipes', JSON.stringify(this.recipes));
                // Trigger storage event for cross-tab sync
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'restaurant_recipes',
                    newValue: JSON.stringify(this.recipes)
                }));
            } catch (error) {
                console.error('Error saving recipes:', error);
                alert('Error saving recipes. Please check your browser storage.');
            }
        },
        
        loadRecipes() {
            try {
                const savedRecipes = localStorage.getItem('restaurant_recipes');
                this.recipes = savedRecipes ? JSON.parse(savedRecipes) : this.getDefaultRecipes();
                this.loadRecipeCategories();
            } catch (error) {
                console.error('Error loading recipes:', error);
                this.recipes = this.getDefaultRecipes();
            }
        },
        
        getDefaultRecipes() {
            return [
                      {
                                "id": 1,
                                "name": "Greek pita with olive pâté",
                                "nameHe": "פיתה יוונית עם ממרח זיתים",
                                "category": "Opening",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "starter"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364049,
                                "updatedAt": 1786320364049
                      },
                      {
                                "id": 2,
                                "name": "Edamame",
                                "nameHe": "אדממה",
                                "category": "Opening",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "starter"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364049,
                                "updatedAt": 1786320364049
                      },
                      {
                                "id": 3,
                                "name": "Crispy French fries",
                                "nameHe": "צ׳יפס קריספי",
                                "category": "Opening",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "starter"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364049,
                                "updatedAt": 1786320364049
                      },
                      {
                                "id": 4,
                                "name": "Fresh vegetable plate",
                                "nameHe": "פלטת ירקות טריים",
                                "category": "Opening",
                                "price": 28,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "starter"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364049,
                                "updatedAt": 1786320364049
                      },
                      {
                                "id": 5,
                                "name": "Rice plate",
                                "nameHe": "צלחת אורז",
                                "category": "Opening",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "starter"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364049,
                                "updatedAt": 1786320364049
                      },
                      {
                                "id": 6,
                                "name": "Tahini with 2 pita breads",
                                "nameHe": "טחינה בתוספת שתי פיתות",
                                "category": "Salads",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364049,
                                "updatedAt": 1786320364049
                      },
                      {
                                "id": 7,
                                "name": "Eggplant",
                                "nameHe": "חצילים",
                                "category": "Salads",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364049,
                                "updatedAt": 1786320364049
                      },
                      {
                                "id": 8,
                                "name": "Eggplant with tahini",
                                "nameHe": "חצילים עם טחינה בצד",
                                "category": "Salads",
                                "price": 13,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 9,
                                "name": "Grilled hot peppers",
                                "nameHe": "פלפלים חריפים על האש",
                                "category": "Salads",
                                "price": 7,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 10,
                                "name": "Greek olives",
                                "nameHe": "זיתים יווניים",
                                "category": "Salads",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 11,
                                "name": "Chopped vegetable salad",
                                "nameHe": "סלט ירקות קצוץ",
                                "category": "Salads",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 12,
                                "name": "Yasou salad",
                                "nameHe": "סלט יאסו",
                                "category": "Salads",
                                "price": 13,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 13,
                                "name": "Vegan Greek Salad",
                                "nameHe": "סלט יווני טבעוני",
                                "category": "Salads",
                                "price": 28,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 14,
                                "name": "Extra two pita breads",
                                "nameHe": "תוספת 2 פיתות",
                                "category": "Salads",
                                "price": 3,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 15,
                                "name": "Extra tahini / Zhug hot sauce",
                                "nameHe": "תוספת טחינה / חריף סחוג",
                                "category": "Salads",
                                "price": 3,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 16,
                                "name": "Home-made hummus",
                                "nameHe": "חומוס ביתי",
                                "category": "Hummus",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "popular"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 17,
                                "name": "Hummus Tahini",
                                "nameHe": "חומוס טחינה",
                                "category": "Hummus",
                                "price": 13,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "popular"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 18,
                                "name": "Hummus with mushrooms",
                                "nameHe": "חומוס פטריות",
                                "category": "Hummus",
                                "price": 15,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "popular"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 19,
                                "name": "Hummus with mini schnitzel",
                                "nameHe": "חומוס שניצלונים",
                                "category": "Hummus",
                                "price": 20,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "popular"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 20,
                                "name": "Hummus with minced meat",
                                "nameHe": "חומוס בשר טחון",
                                "category": "Hummus",
                                "price": 20,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "popular"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 21,
                                "name": "Pargit - chicken thighs",
                                "nameHe": "פרגיות",
                                "category": "Meat & Chicken",
                                "price": 28,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 18,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "popular"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 22,
                                "name": "Schnitzel",
                                "nameHe": "שניצל",
                                "category": "Meat & Chicken",
                                "price": 28,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 18,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "popular"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 23,
                                "name": "Mini schnitzel",
                                "nameHe": "שניצלונים",
                                "category": "Meat & Chicken",
                                "price": 28,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 18,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "popular"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 24,
                                "name": "Grilled chicken breast",
                                "nameHe": "חזה עוף על האש",
                                "category": "Meat & Chicken",
                                "price": 28,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 18,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "popular"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 25,
                                "name": "Greek kebab",
                                "nameHe": "קבב יווני",
                                "category": "Meat & Chicken",
                                "price": 30,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 18,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "popular"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 26,
                                "name": "Burger on Greek pita",
                                "nameHe": "המבורגר על פיתה יוונית",
                                "category": "Meat & Chicken",
                                "price": 30,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 18,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "popular"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 27,
                                "name": "Sea bream - Dorade",
                                "nameHe": "דניס / צ׳יפורה",
                                "category": "Fish",
                                "price": 30,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 18,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 28,
                                "name": "Sea bass - Loup de mer",
                                "nameHe": "לברק",
                                "category": "Fish",
                                "price": 30,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 18,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 29,
                                "name": "Omelette with salad & pita",
                                "nameHe": "חביתה + שתי פיתות + קערית סלט",
                                "category": "Vegan / Vegetarian",
                                "price": 15,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 30,
                                "name": "Omelette with onion or mushrooms",
                                "nameHe": "חביתה עם בצל או פטריות + פיתות + סלט",
                                "category": "Vegan / Vegetarian",
                                "price": 18,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 31,
                                "name": "Greek salad with vegan cheese",
                                "nameHe": "סלט יווני עם גבינה טבעונית + שתי פיתות",
                                "category": "Vegan / Vegetarian",
                                "price": 28,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "vegetarian",
                                          "healthy"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 32,
                                "name": "Water / Soda",
                                "nameHe": "מים / סודה",
                                "category": "Soft Drinks",
                                "price": 4,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 33,
                                "name": "Cola / Zero",
                                "nameHe": "קולה / זירו",
                                "category": "Soft Drinks",
                                "price": 4,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 34,
                                "name": "Sprite / Zero",
                                "nameHe": "ספרייט / זירו",
                                "category": "Soft Drinks",
                                "price": 4,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 35,
                                "name": "Fanta Orange",
                                "nameHe": "פנטה תפוזים",
                                "category": "Soft Drinks",
                                "price": 4,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 36,
                                "name": "Ice Tea Peach",
                                "nameHe": "אייס תה אפרסק",
                                "category": "Soft Drinks",
                                "price": 4,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 37,
                                "name": "Juices: Orange / Lemonade / Cherry",
                                "nameHe": "מיצים: תפוזים / לימונדה / דובדבן",
                                "category": "Soft Drinks",
                                "price": 4,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 38,
                                "name": "Energy drink",
                                "nameHe": "משקה אנרגיה",
                                "category": "Soft Drinks",
                                "price": 8,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 39,
                                "name": "Heineken",
                                "nameHe": "הייניקן",
                                "category": "Alcoholic Drinks",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 40,
                                "name": "Carlsberg",
                                "nameHe": "קרלסברג",
                                "category": "Alcoholic Drinks",
                                "price": 12,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 41,
                                "name": "Corona",
                                "nameHe": "קורונה",
                                "category": "Alcoholic Drinks",
                                "price": 13,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 42,
                                "name": "Yasou Ouzo Cocktail",
                                "nameHe": "יאסו קוקטייל אוזו",
                                "category": "Alcoholic Drinks",
                                "price": 15,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 43,
                                "name": "Non-alcoholic fruit mix",
                                "nameHe": "מיקס פירות ללא אלכוהול",
                                "category": "Alcoholic Drinks",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 44,
                                "name": "Plomari",
                                "nameHe": "פלומרי",
                                "category": "Alcoholic Drinks",
                                "price": 12,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 45,
                                "name": "Ouzo 12",
                                "nameHe": "אוזו 12",
                                "category": "Alcoholic Drinks",
                                "price": 12,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 46,
                                "name": "Ouzo 200ml",
                                "nameHe": "אוזו 200 מ״ל",
                                "category": "Alcoholic Drinks",
                                "price": 30,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 47,
                                "name": "Jameson",
                                "nameHe": "ג׳יימסון",
                                "category": "Alcoholic Drinks",
                                "price": 15,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 48,
                                "name": "Jack Daniel's",
                                "nameHe": "ג׳ק דניאל",
                                "category": "Alcoholic Drinks",
                                "price": 15,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 49,
                                "name": "Chivas",
                                "nameHe": "שיבאס",
                                "category": "Alcoholic Drinks",
                                "price": 13,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 50,
                                "name": "Black Label",
                                "nameHe": "בלאק לייבל",
                                "category": "Alcoholic Drinks",
                                "price": 15,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 51,
                                "name": "Stoli",
                                "nameHe": "סטולי",
                                "category": "Alcoholic Drinks",
                                "price": 13,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 52,
                                "name": "Finlandia",
                                "nameHe": "פילנדיה",
                                "category": "Alcoholic Drinks",
                                "price": 13,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 53,
                                "name": "Grey Goose",
                                "nameHe": "גריי גוס",
                                "category": "Alcoholic Drinks",
                                "price": 15,
                                "basePortions": 1,
                                "prepTime": 2,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "beverage"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 54,
                                "name": "Nargilla: Apple / Watermelon / Mint",
                                "nameHe": "נרגילה: תפוח / אבטיח / נענע",
                                "category": "Nargilla",
                                "price": 30,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "nargilla"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 55,
                                "name": "Refill head + new coal",
                                "nameHe": "החלפת ראש + גחל חדש",
                                "category": "Nargilla",
                                "price": 15,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "nargilla"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      },
                      {
                                "id": 56,
                                "name": "Dessert of the day",
                                "nameHe": "שאל את המלצר על קינוח היום!",
                                "category": "Dessert",
                                "price": 10,
                                "basePortions": 1,
                                "prepTime": 12,
                                "cookTime": 0,
                                "difficulty": "easy",
                                "allergens": [],
                                "tags": [
                                          "dessert"
                                ],
                                "ingredients": [],
                                "instructions": "Yasou Taverna menu item.",
                                "notes": "",
                                "image": "",
                                "isActive": true,
                                "createdAt": 1786320364050,
                                "updatedAt": 1786320364050
                      }
            ];
        },
        
        // Data validation and cleanup functions
        validateAndCleanData() {
            // Clean up orders (remove invalid ones)
            this.orders = this.orders.filter(order => 
                order && order.id && order.items && Array.isArray(order.items)
            );
            
            // Clean up recipes (remove invalid ones)
            this.recipes = this.recipes.filter(recipe => 
                recipe && recipe.id && recipe.name && recipe.price > 0
            );
            
            // Clean up tables (remove invalid ones)
            this.tables = this.tables.filter(table => 
                table && table.id && table.number
            );
            
            // Save cleaned data
            this.saveOrders();
            this.saveRecipes();
            this.saveTables();
        },
        
        // Export all data with validation
        exportAllData() {
            try {
                const exportData = {
                    recipes: this.recipes,
                    orders: this.orders,
                    tables: this.tables,
                    settings: this.settings,
                    chefs: this.chefs,
                    stations: this.stations,
                    recipeCategories: this.recipeCategories,
                    exportDate: new Date().toISOString(),
                    version: '1.0'
                };
                
                const dataStr = JSON.stringify(exportData, null, 2);
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `restaurant_backup_${new Date().toISOString().split('T')[0]}.json`;
                link.click();
                URL.revokeObjectURL(url);
                
                return true;
            } catch (error) {
                console.error('Error exporting data:', error);
                alert('Error exporting data. Please try again.');
                return false;
            }
        },
        
        // Import all data with validation
        importAllData(jsonData) {
            try {
                const data = JSON.parse(jsonData);
                
                // Validate data structure
                if (!data.recipes || !data.orders || !data.tables || !data.settings) {
                    throw new Error('Invalid backup file format');
                }
                
                // Import data with validation
                this.recipes = Array.isArray(data.recipes) ? data.recipes : [];
                this.orders = Array.isArray(data.orders) ? data.orders : [];
                this.tables = Array.isArray(data.tables) ? data.tables : [];
                this.settings = data.settings || {};
                this.chefs = Array.isArray(data.chefs) ? data.chefs : [];
                this.stations = Array.isArray(data.stations) ? data.stations : [];
                this.recipeCategories = Array.isArray(data.recipeCategories) ? data.recipeCategories : [];
                
                // Save all imported data
                this.saveRecipes();
                this.saveOrders();
                this.saveTables();
                this.saveSettings();
                this.saveChefs();
                this.saveStations();
                this.saveRecipeCategories();
                
                // Validate and clean imported data
                this.validateAndCleanData();
                
                alert('Data imported successfully!');
                return true;
            } catch (error) {
                console.error('Error importing data:', error);
                alert('Error importing data. Please check the file format.');
                return false;
            }
        },
        
        loadStations() {
            try {
                const savedStations = localStorage.getItem('restaurant_stations');
                this.stations = savedStations ? JSON.parse(savedStations) : [
                    { name: 'Grill' },
                    { name: 'Fry' },
                    { name: 'Salad' },
                    { name: 'Dessert' }
                ];
            } catch (error) {
                console.error('Error loading stations:', error);
                this.stations = [
                    { name: 'Grill' },
                    { name: 'Fry' },
                    { name: 'Salad' },
                    { name: 'Dessert' }
                ];
            }
        },
        
        loadChefs() {
            try {
                const savedChefs = localStorage.getItem('restaurant_chefs');
                this.chefs = savedChefs ? JSON.parse(savedChefs) : [
                    { name: 'אבישג', nameEn: 'Chef Avishag' },
                    { name: 'בן', nameEn: 'Chef Ben' },
                    { name: 'קרלוס', nameEn: 'Chef Carlos' }
                ];
                this.chefs = this.chefs.map(chef => this.normalizeChef(chef));
                this.saveChefs();
            } catch (error) {
                console.error('Error loading chefs:', error);
                this.chefs = [
                    { name: 'אבישג', nameEn: 'Chef Avishag' },
                    { name: 'בן', nameEn: 'Chef Ben' },
                    { name: 'קרלוס', nameEn: 'Chef Carlos' }
                ];
            }
        },
        
        // Import backup file with enhanced validation
        importBackupFile(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const jsonData = e.target.result;
                this.importAllData(jsonData);
            };
            reader.readAsText(file);
        },
        
        // Clear all data with confirmation
        clearAllData() {
            if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                try {
                    // Clear all localStorage
                    localStorage.removeItem('restaurant_recipes');
                    localStorage.removeItem('restaurant_orders');
                    localStorage.removeItem('restaurant_tables');
                    localStorage.removeItem('restaurant_settings');
                    localStorage.removeItem('restaurant_chefs');
                    localStorage.removeItem('restaurant_stations');
                    localStorage.removeItem('restaurant_recipe_categories');
                    localStorage.removeItem('restaurant_inventory');
                    localStorage.removeItem('restaurant_suppliers');
                    localStorage.removeItem('restaurant_purchases');
                    localStorage.removeItem('restaurant_waste');
                    
                    // Reset all data arrays
                    this.recipes = [];
                    this.orders = [];
                    this.tables = [];
                    this.chefs = [];
                    this.stations = [];
                    this.inventory = [];
                    this.suppliers = [];
                    this.purchases = [];
                    this.waste = [];
                    this.recipeCategories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Pizza', 'Salad', 'Soup', 'Pasta', 'Seafood', 'Meat', 'Vegetarian'];
                    
                    // Reset settings to defaults
                    this.settings = this.getDefaultSettings();
                    
                    // Reset current order
                    this.currentOrder = {
                        items: [],
                        subtotal: 0,
                        tax: 0,
                        total: 0,
                        tableNumber: null,
                        deliveryFee: 0
                    };
                    
                    // Reset form states
                    this.selectedRecipe = null;
                    this.selectedTable = null;
                    this.showRecipeForm = false;
                    this.showTableForm = false;
                    this.showBackup = false;
                    
                    alert('All data has been cleared successfully.');
                } catch (error) {
                    console.error('Error clearing data:', error);
                    alert('Error clearing data. Please try again.');
                }
            }
        },
        
        // ===== INVENTORY MANAGEMENT FUNCTIONS =====
        
        // Get filtered inventory
        getFilteredInventory() {
            let filtered = this.inventory;
            
            // Search filter
            if (this.inventorySearchTerm) {
                const search = this.inventorySearchTerm.toLowerCase();
                filtered = filtered.filter(item => 
                    (item.name || '').toLowerCase().includes(search) ||
                    this.getInventoryItemName(item).toLowerCase().includes(search) ||
                    (item.category || '').toLowerCase().includes(search) ||
                    this.getInventoryCategoryLabel(item.category).toLowerCase().includes(search) ||
                    (item.supplier || '').toLowerCase().includes(search) ||
                    this.getInventorySupplierLabel(item.supplier).toLowerCase().includes(search)
                );
            }
            
            // Category filter
            if (this.inventoryFilterCategory !== 'all') {
                filtered = filtered.filter(item => item.category === this.inventoryFilterCategory);
            }
            
            // Sort
            filtered.sort((a, b) => {
                let aVal = a[this.inventorySortBy];
                let bVal = b[this.inventorySortBy];
                
                if (this.inventorySortBy === 'name' || this.inventorySortBy === 'category') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }
                
                if (this.inventorySortOrder === 'asc') {
                    return aVal > bVal ? 1 : -1;
                } else {
                    return aVal < bVal ? 1 : -1;
                }
            });
            
            return filtered;
        },
        
        // Get inventory categories
        getInventoryCategories() {
            const categories = [...new Set(this.inventory.map(item => item.category))];
            return categories.sort();
        },

        getInventoryItemName(item) {
            const name = typeof item === 'string' ? item : item?.name;
            const labels = {
                'Greek pita breads': 'פיתות יווניות',
                'Chickpeas': 'גרגירי חומוס',
                'Raw tahini': 'טחינה גולמית',
                'Olive oil': 'שמן זית',
                'Fresh vegetables': 'ירקות טריים',
                'Eggplants': 'חצילים',
                'Greek olives': 'זיתים יווניים',
                'Green hot peppers': 'פלפלים חריפים ירוקים',
                'Rice': 'אורז',
                'Chicken thighs': 'פרגיות',
                'Chicken breast': 'חזה עוף',
                'Chicken schnitzel': 'שניצל עוף',
                'Minced beef': 'בשר בקר טחון',
                'Beef kebab mix': 'תערובת קבב בקר',
                'Sea bream': 'דניס',
                'Sea bass': 'לברק',
                'Eggs': 'ביצים',
                'Vegan cheese': 'גבינה טבעונית',
                'Soft drink bottles': 'בקבוקי שתייה קלה',
                'Beer bottles': 'בקבוקי בירה',
                'Ouzo bottles': 'בקבוקי אוזו',
                'Whiskey bottles': 'בקבוקי וויסקי'
            };

            return this.language === 'he' ? (labels[name] || name || '') : (name || '');
        },

        getInventoryCategoryLabel(category) {
            const labels = {
                Bread: 'לחם ופיתות',
                Pantry: 'מזווה',
                Produce: 'ירקות ופירות',
                Meat: 'בשר ועוף',
                Fish: 'דגים',
                Vegetarian: 'צמחוני',
                Drinks: 'שתייה קלה',
                Alcohol: 'אלכוהול'
            };

            return this.language === 'he' ? (labels[category] || category || '') : (category || '');
        },

        getInventorySupplierLabel(supplier) {
            const labels = {
                'Yasou Bakery Supplier': 'ספק מאפים יאסו',
                'Fresh Produce Supplier': 'ספק ירקות טריים',
                'Kosher Meat Supplier': 'ספק בשר כשר',
                'Fresh Fish Supplier': 'ספק דגים טריים',
                'Beverage Supplier': 'ספק שתייה',
                'Alcohol Supplier': 'ספק אלכוהול'
            };

            return this.language === 'he' ? (labels[supplier] || supplier || '') : (supplier || '');
        },

        getInventoryLocationLabel(location) {
            const labels = {
                'Freezer A': 'מקפיא A',
                'Freezer D': 'מקפיא D',
                'Pantry A': 'מזווה A',
                'Pantry B': 'מזווה B',
                'Refrigerator C': 'מקרר C'
            };

            return this.language === 'he' ? (labels[location] || location || '') : (location || '');
        },

        getInventoryUnitLabel(unit) {
            const labels = {
                pc: this.translations.unitPiece || 'יח׳',
                g: this.translations.unitGram || 'גרם'
            };

            return this.language === 'he' ? (labels[unit] || unit || '') : (unit || '');
        },
        
        // Inventory CRUD operations
        addInventory() {
            this.editingInventory = null;
            this.resetInventoryForm();
            this.showInventoryForm = true;
        },
        
        editInventory(item) {
            this.editingInventory = item;
            this.inventoryForm = { ...item };
            this.showInventoryForm = true;
        },
        
        saveInventoryItem() {
            if (this.editingInventory) {
                // Update existing item
                const index = this.inventory.findIndex(item => item.id === this.inventoryForm.id);
                if (index !== -1) {
                    this.inventory[index] = { ...this.inventoryForm };
                }
            } else {
                // Add new item
                const newItem = {
                    ...this.inventoryForm,
                    id: Date.now(),
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                };
                this.inventory.push(newItem);
            }
            
            this.saveInventory();
            this.showInventoryForm = false;
            this.editingInventory = null;
            this.resetInventoryForm();
        },
        
        deleteInventory(id) {
            if (confirm('Are you sure you want to delete this inventory item?')) {
                this.inventory = this.inventory.filter(item => item.id !== id);
                this.saveInventory();
            }
        },
        
        resetInventoryForm() {
            this.inventoryForm = {
                name: '',
                category: '',
                unit: '',
                currentStock: 0,
                minStock: 0,
                maxStock: 0,
                cost: 0,
                supplier: '',
                location: '',
                expiryDate: null,
                notes: ''
            };
        },
        
        // Stock operations
        updateStock(id, quantity, operation = 'add', reason = 'Manual adjustment') {
            const item = this.inventory.find(item => item.id === id);
            if (item) {
                const oldStock = item.currentStock;
                
                if (operation === 'add') {
                    item.currentStock += quantity;
                } else if (operation === 'subtract') {
                    item.currentStock = Math.max(0, item.currentStock - quantity);
                } else if (operation === 'set') {
                    item.currentStock = quantity;
                }
                
                item.lastUpdated = Date.now();
                
                // Log the transaction
                this.logStockTransaction(item, oldStock, item.currentStock, operation, reason);
                
                this.saveInventory();
                this.updateInventoryAlerts();
            }
        },
        
        // Automatic stock deduction from orders
        deductStockFromOrder(order) {
            order.items.forEach(orderItem => {
                const recipe = this.recipes.find(r => r.id === orderItem.id);
                if (recipe && recipe.ingredients) {
                    recipe.ingredients.forEach(ingredient => {
                        const inventoryItem = this.inventory.find(item => 
                            item.name.toLowerCase() === ingredient.name.toLowerCase()
                        );
                        
                        if (inventoryItem) {
                            const totalQuantity = ingredient.quantity * orderItem.quantity;
                            this.updateStock(
                                inventoryItem.id, 
                                totalQuantity, 
                                'subtract', 
                                `Order #${order.id} - ${recipe.name}`
                            );
                        }
                    });
                }
            });
        },
        
        // Stock transaction logging
        logStockTransaction(item, oldStock, newStock, operation, reason) {
            const transaction = {
                id: Date.now(),
                itemId: item.id,
                itemName: item.name,
                oldStock,
                newStock,
                change: newStock - oldStock,
                operation,
                reason,
                timestamp: Date.now()
            };
            
            const transactions = JSON.parse(localStorage.getItem('restaurant_stock_transactions') || '[]');
            transactions.push(transaction);
            localStorage.setItem('restaurant_stock_transactions', JSON.stringify(transactions));
        },
        
        // Get stock transactions
        getStockTransactions(itemId = null) {
            const transactions = JSON.parse(localStorage.getItem('restaurant_stock_transactions') || '[]');
            if (itemId) {
                return transactions.filter(t => t.itemId === itemId);
            }
            return transactions;
        },
        
        // Purchase management
        addPurchase() {
            this.editingPurchase = null;
            this.resetPurchaseForm();
            this.showPurchaseForm = true;
        },
        
        editPurchase(purchase) {
            this.editingPurchase = purchase;
            this.purchaseForm = { ...purchase };
            this.showPurchaseForm = true;
        },
        
        savePurchase() {
            if (this.editingPurchase) {
                const index = this.purchases.findIndex(p => p.id === this.purchaseForm.id);
                if (index !== -1) {
                    this.purchases[index] = { ...this.purchaseForm };
                }
            } else {
                const newPurchase = {
                    ...this.purchaseForm,
                    id: Date.now(),
                    createdAt: Date.now(),
                    status: 'pending'
                };
                this.purchases.push(newPurchase);
            }
            
            this.savePurchases();
            this.showPurchaseForm = false;
            this.editingPurchase = null;
            this.resetPurchaseForm();
        },
        
        receivePurchase(purchaseId) {
            const purchase = this.purchases.find(p => p.id === purchaseId);
            if (purchase) {
                purchase.status = 'received';
                purchase.receivedDate = Date.now();
                
                // Update inventory stock
                purchase.items.forEach(item => {
                    this.updateStock(
                        item.inventoryId,
                        item.quantity,
                        'add',
                        `Purchase #${purchase.id} from ${purchase.supplier}`
                    );
                });
                
                this.savePurchases();
            }
        },
        
        resetPurchaseForm() {
            this.purchaseForm = {
                supplier: '',
                items: [],
                totalCost: 0,
                purchaseDate: new Date().toISOString().split('T')[0],
                expectedDelivery: null,
                notes: ''
            };
        },
        
        addPurchaseItem() {
            this.purchaseForm.items.push({
                inventoryId: '',
                name: '',
                quantity: 0,
                unit: '',
                cost: 0
            });
        },
        
        removePurchaseItem(index) {
            this.purchaseForm.items.splice(index, 1);
        },
        
        calculatePurchaseTotal() {
            this.purchaseForm.totalCost = this.purchaseForm.items.reduce(
                (sum, item) => sum + (item.cost * item.quantity), 0
            );
        },
        
        // Supplier management
        addSupplier() {
            this.editingSupplier = null;
            this.resetSupplierForm();
            this.showSupplierForm = true;
        },
        
        editSupplier(supplier) {
            this.editingSupplier = supplier;
            this.supplierForm = { ...supplier };
            this.showSupplierForm = true;
        },
        
        saveSupplier() {
            if (this.editingSupplier) {
                const index = this.suppliers.findIndex(s => s.id === this.supplierForm.id);
                if (index !== -1) {
                    this.suppliers[index] = { ...this.supplierForm };
                }
            } else {
                const newSupplier = {
                    ...this.supplierForm,
                    id: Date.now(),
                    createdAt: Date.now()
                };
                this.suppliers.push(newSupplier);
            }
            
            this.saveSuppliers();
            this.showSupplierForm = false;
            this.editingSupplier = null;
            this.resetSupplierForm();
        },
        
        deleteSupplier(id) {
            if (confirm('Are you sure you want to delete this supplier?')) {
                this.suppliers = this.suppliers.filter(s => s.id !== id);
                this.saveSuppliers();
            }
        },
        
        resetSupplierForm() {
            this.supplierForm = {
                name: '',
                contact: '',
                phone: '',
                email: '',
                address: '',
                paymentTerms: '',
                notes: ''
            };
        },
        
        // Waste management
        addWaste() {
            this.resetWasteForm();
            this.showWasteForm = true;
        },
        
        saveWaste() {
            const newWaste = {
                ...this.wasteForm,
                id: Date.now(),
                createdAt: Date.now()
            };
            
            this.waste.push(newWaste);
            
            // Deduct from inventory
            const inventoryItem = this.inventory.find(item => item.id === this.wasteForm.item);
            if (inventoryItem) {
                this.updateStock(
                    inventoryItem.id,
                    this.wasteForm.quantity,
                    'subtract',
                    `Waste - ${this.wasteForm.reason}`
                );
            }
            
            this.saveWaste();
            this.showWasteForm = false;
            this.resetWasteForm();
        },
        
        resetWasteForm() {
            this.wasteForm = {
                item: '',
                quantity: 0,
                reason: '',
                date: new Date().toISOString().split('T')[0],
                notes: ''
            };
        },
        
        // Inventory alerts
        updateInventoryAlerts() {
            this.inventoryAlerts = this.inventory.filter(item => 
                item.currentStock <= item.minStock
            );
        },
        
        getLowStockItems() {
            return this.inventory.filter(item => item.currentStock <= item.minStock);
        },
        
        getOutOfStockItems() {
            return this.inventory.filter(item => item.currentStock <= 0);
        },
        
        // Reports
        generateInventoryReport() {
            const report = {
                totalItems: this.inventory.length,
                totalValue: this.inventory.reduce((sum, item) => sum + (item.currentStock * item.cost), 0),
                lowStockItems: this.getLowStockItems().length,
                outOfStockItems: this.getOutOfStockItems().length,
                categories: this.getInventoryCategories().map(category => {
                    const items = this.inventory.filter(item => item.category === category);
                    return {
                        category,
                        count: items.length,
                        value: items.reduce((sum, item) => sum + (item.currentStock * item.cost), 0)
                    };
                }),
                topSuppliers: this.getTopSuppliers(),
                recentTransactions: this.getStockTransactions().slice(-10)
            };
            
            return report;
        },
        
        getTopSuppliers() {
            const supplierStats = {};
            this.inventory.forEach(item => {
                if (item.supplier) {
                    if (!supplierStats[item.supplier]) {
                        supplierStats[item.supplier] = { count: 0, value: 0 };
                    }
                    supplierStats[item.supplier].count++;
                    supplierStats[item.supplier].value += item.currentStock * item.cost;
                }
            });
            
            return Object.entries(supplierStats)
                .map(([name, stats]) => ({ name, ...stats }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 5);
        },
        
        // Export/Import inventory data
        exportInventoryData() {
            const data = {
                inventory: this.inventory,
                suppliers: this.suppliers,
                purchases: this.purchases,
                waste: this.waste,
                transactions: this.getStockTransactions(),
                exportDate: new Date().toISOString()
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `inventory_backup_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        },
        
        importInventoryData(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (data.inventory) this.inventory = data.inventory;
                    if (data.suppliers) this.suppliers = data.suppliers;
                    if (data.purchases) this.purchases = data.purchases;
                    if (data.waste) this.waste = data.waste;
                    
                    this.saveInventory();
                    this.saveSuppliers();
                    this.savePurchases();
                    this.saveWaste();
                    
                    alert('Inventory data imported successfully!');
                } catch (error) {
                    alert('Error importing data: ' + error.message);
                }
            };
            reader.readAsText(file);
        },
        
        // Default inventory data
        getDefaultInventory() {
            return [
                {
                    id: 1,
                    name: 'Greek pita breads',
                    category: 'Bread',
                    unit: 'pc',
                    currentStock: 120,
                    minStock: 30,
                    maxStock: 250,
                    cost: 0.45,
                    supplier: 'Yasou Bakery Supplier',
                    location: 'Dry Storage A',
                    expiryDate: null,
                    notes: 'For pita sides, hummus plates, and burgers on Greek pita',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 2,
                    name: 'Chickpeas',
                    category: 'Pantry',
                    unit: 'g',
                    currentStock: 25000,
                    minStock: 5000,
                    maxStock: 50000,
                    cost: 0.01,
                    supplier: 'Fresh Produce Supplier',
                    location: 'Pantry B',
                    expiryDate: null,
                    notes: 'Base for homemade hummus',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 3,
                    name: 'Raw tahini',
                    category: 'Pantry',
                    unit: 'g',
                    currentStock: 12000,
                    minStock: 2500,
                    maxStock: 25000,
                    cost: 0.04,
                    supplier: 'Fresh Produce Supplier',
                    location: 'Pantry B',
                    expiryDate: null,
                    notes: 'For tahini bowls, hummus, sauces, and sides',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 4,
                    name: 'Olive oil',
                    category: 'Pantry',
                    unit: 'ml',
                    currentStock: 10000,
                    minStock: 2000,
                    maxStock: 20000,
                    cost: 0.03,
                    supplier: 'Fresh Produce Supplier',
                    location: 'Pantry B',
                    expiryDate: null,
                    notes: 'For salads, hummus, eggplant, fish, and grilled dishes',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 5,
                    name: 'Fresh vegetables',
                    category: 'Produce',
                    unit: 'kg',
                    currentStock: 35,
                    minStock: 8,
                    maxStock: 70,
                    cost: 2.20,
                    supplier: 'Fresh Produce Supplier',
                    location: 'Walk-in Fridge A',
                    expiryDate: null,
                    notes: 'Tomato, cucumber, onion, herbs, lemon, lettuce, and salad garnish',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 6,
                    name: 'Eggplants',
                    category: 'Produce',
                    unit: 'kg',
                    currentStock: 12,
                    minStock: 3,
                    maxStock: 25,
                    cost: 1.90,
                    supplier: 'Fresh Produce Supplier',
                    location: 'Walk-in Fridge A',
                    expiryDate: null,
                    notes: 'For eggplant plates and eggplant with tahini',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 7,
                    name: 'Greek olives',
                    category: 'Pantry',
                    unit: 'kg',
                    currentStock: 8,
                    minStock: 2,
                    maxStock: 18,
                    cost: 4.80,
                    supplier: 'Fresh Produce Supplier',
                    location: 'Pantry B',
                    expiryDate: null,
                    notes: 'For Greek olives, salads, and garnish',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 8,
                    name: 'Green hot peppers',
                    category: 'Produce',
                    unit: 'kg',
                    currentStock: 5,
                    minStock: 1,
                    maxStock: 12,
                    cost: 2.60,
                    supplier: 'Fresh Produce Supplier',
                    location: 'Walk-in Fridge A',
                    expiryDate: null,
                    notes: 'For grilled hot peppers and spicy garnish',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 9,
                    name: 'Rice',
                    category: 'Pantry',
                    unit: 'kg',
                    currentStock: 20,
                    minStock: 5,
                    maxStock: 40,
                    cost: 1.40,
                    supplier: 'Fresh Produce Supplier',
                    location: 'Pantry B',
                    expiryDate: null,
                    notes: 'For rice plates and side dishes',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 10,
                    name: 'Chicken thighs',
                    category: 'Meat',
                    unit: 'kg',
                    currentStock: 18,
                    minStock: 5,
                    maxStock: 40,
                    cost: 7.50,
                    supplier: 'Kosher Meat Supplier',
                    location: 'Meat Fridge',
                    expiryDate: null,
                    notes: 'For pargit chicken thighs',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 11,
                    name: 'Chicken breast',
                    category: 'Meat',
                    unit: 'kg',
                    currentStock: 16,
                    minStock: 4,
                    maxStock: 35,
                    cost: 7.20,
                    supplier: 'Kosher Meat Supplier',
                    location: 'Meat Fridge',
                    expiryDate: null,
                    notes: 'For grilled chicken breast',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 12,
                    name: 'Chicken schnitzel',
                    category: 'Meat',
                    unit: 'kg',
                    currentStock: 14,
                    minStock: 4,
                    maxStock: 30,
                    cost: 6.90,
                    supplier: 'Kosher Meat Supplier',
                    location: 'Meat Fridge',
                    expiryDate: null,
                    notes: 'For schnitzel and mini schnitzel dishes',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 13,
                    name: 'Minced beef',
                    category: 'Meat',
                    unit: 'kg',
                    currentStock: 12,
                    minStock: 3,
                    maxStock: 25,
                    cost: 9.80,
                    supplier: 'Kosher Meat Supplier',
                    location: 'Meat Fridge',
                    expiryDate: null,
                    notes: 'For hummus with minced meat and burger patties',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 14,
                    name: 'Beef kebab mix',
                    category: 'Meat',
                    unit: 'kg',
                    currentStock: 10,
                    minStock: 3,
                    maxStock: 22,
                    cost: 10.50,
                    supplier: 'Kosher Meat Supplier',
                    location: 'Meat Fridge',
                    expiryDate: null,
                    notes: 'For Greek kebab',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 15,
                    name: 'Sea bream',
                    category: 'Fish',
                    unit: 'kg',
                    currentStock: 10,
                    minStock: 3,
                    maxStock: 22,
                    cost: 11.50,
                    supplier: 'Fresh Fish Supplier',
                    location: 'Fish Fridge',
                    expiryDate: null,
                    notes: 'For sea bream / dorade',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 16,
                    name: 'Sea bass',
                    category: 'Fish',
                    unit: 'kg',
                    currentStock: 10,
                    minStock: 3,
                    maxStock: 22,
                    cost: 12.00,
                    supplier: 'Fresh Fish Supplier',
                    location: 'Fish Fridge',
                    expiryDate: null,
                    notes: 'For sea bass / loup de mer',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 17,
                    name: 'Eggs',
                    category: 'Vegetarian',
                    unit: 'pc',
                    currentStock: 90,
                    minStock: 24,
                    maxStock: 180,
                    cost: 0.25,
                    supplier: 'Fresh Produce Supplier',
                    location: 'Walk-in Fridge A',
                    expiryDate: null,
                    notes: 'For omelette dishes',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 18,
                    name: 'Vegan cheese',
                    category: 'Vegetarian',
                    unit: 'g',
                    currentStock: 3000,
                    minStock: 800,
                    maxStock: 6000,
                    cost: 0.09,
                    supplier: 'Fresh Produce Supplier',
                    location: 'Walk-in Fridge A',
                    expiryDate: null,
                    notes: 'For Greek salad with vegan cheese',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 19,
                    name: 'Soft drink bottles',
                    category: 'Drinks',
                    unit: 'pc',
                    currentStock: 180,
                    minStock: 40,
                    maxStock: 360,
                    cost: 0.80,
                    supplier: 'Beverage Supplier',
                    location: 'Beverage Storage',
                    expiryDate: null,
                    notes: 'Cola, zero, sprite, fanta, iced tea, juices, water, soda, and energy drinks',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 20,
                    name: 'Beer bottles',
                    category: 'Alcohol',
                    unit: 'pc',
                    currentStock: 96,
                    minStock: 24,
                    maxStock: 180,
                    cost: 1.20,
                    supplier: 'Alcohol Supplier',
                    location: 'Bar Storage',
                    expiryDate: null,
                    notes: 'Heineken, Carlsberg, Corona',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 21,
                    name: 'Ouzo bottles',
                    category: 'Alcohol',
                    unit: 'pc',
                    currentStock: 18,
                    minStock: 4,
                    maxStock: 36,
                    cost: 7.50,
                    supplier: 'Alcohol Supplier',
                    location: 'Bar Storage',
                    expiryDate: null,
                    notes: 'Plomari, Ouzo 12, and house ouzo cocktail stock',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                },
                {
                    id: 22,
                    name: 'Whiskey bottles',
                    category: 'Alcohol',
                    unit: 'pc',
                    currentStock: 12,
                    minStock: 3,
                    maxStock: 24,
                    cost: 18.00,
                    supplier: 'Alcohol Supplier',
                    location: 'Bar Storage',
                    expiryDate: null,
                    notes: 'Jameson, Jack Daniel, Chivas, Black Label',
                    createdAt: Date.now(),
                    lastUpdated: Date.now()
                }
            ];
        },
        
        getDefaultSuppliers() {
            return [
                {
                    id: 1,
                    name: 'Yasou Bakery Supplier',
                    contact: '',
                    phone: '',
                    email: '',
                    address: '',
                    paymentTerms: 'Weekly',
                    notes: 'Pita breads and bakery items',
                    createdAt: Date.now()
                },
                {
                    id: 2,
                    name: 'Fresh Produce Supplier',
                    contact: '',
                    phone: '',
                    email: '',
                    address: '',
                    paymentTerms: 'Weekly',
                    notes: 'Vegetables, herbs, tahini, olives, rice, eggs, and vegan cheese',
                    createdAt: Date.now()
                },
                {
                    id: 3,
                    name: 'Kosher Meat Supplier',
                    contact: '',
                    phone: '',
                    email: '',
                    address: '',
                    paymentTerms: 'Weekly',
                    notes: 'Chicken, schnitzel, minced beef, burger meat, and kebab mix',
                    createdAt: Date.now()
                },
                {
                    id: 4,
                    name: 'Fresh Fish Supplier',
                    contact: '',
                    phone: '',
                    email: '',
                    address: '',
                    paymentTerms: 'Weekly',
                    notes: 'Sea bream and sea bass',
                    createdAt: Date.now()
                },
                {
                    id: 5,
                    name: 'Beverage Supplier',
                    contact: '',
                    phone: '',
                    email: '',
                    address: '',
                    paymentTerms: 'Weekly',
                    notes: 'Soft drinks, water, soda, juice, iced tea, and energy drinks',
                    createdAt: Date.now()
                },
                {
                    id: 6,
                    name: 'Alcohol Supplier',
                    contact: '',
                    phone: '',
                    email: '',
                    address: '',
                    paymentTerms: 'Weekly',
                    notes: 'Beer, ouzo, vodka, whiskey, and cocktail stock',
                    createdAt: Date.now()
                }
            ];
        }
    }));
});
