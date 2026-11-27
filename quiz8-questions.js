// Lecture 8 (Arrays) past exam, quiz, and lecture bank selection.
// Snippets assume <iostream>, using namespace std, and standard C++ placement.
// Original exam numbering is retained in source, independently of quiz numbering.
const quiz8Questions = [
    // 8 True / False
    {
        type: 'tf',
        question: '1. An array is a group of variables of similar data types referred to by a single name.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q1.5 · p. 1',
        adaptation: 'Replaced "single element" from the paper with "single name" to match the standard C++ definition.',
        explanation: '<strong>التحليل: صحيح!</strong> المصفوفة (Array) تجمع عدة عناصر من نفس نوع البيانات تحت اسم واحد مشترك، ويُفرّق بينها برقم الفهرس (Index).'
    },
    {
        type: 'tf',
        question: '2. Array elements are always counted from one (1) onward.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Quiz 2 · Fall 2024–2025 · V2 · Q1.4 · p. 1 (also Final Exam · Fall 2025–2026 · Q1.10)',
        explanation: '<strong>التحليل: خطأ!</strong> ترقيم عناصر المصفوفة في C++ يبدأ دائماً من الصفر (<code>0</code>) وليس من 1؛ أي أن أول عنصر هو <code>arr[0]</code>.'
    },
    {
        type: 'tf',
        question: '3. The index number of the last element of an array with 9 elements is 9.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Final Exam · Fall 2025–2026 · Q1.13 · p. 1',
        explanation: '<strong>التحليل: خطأ!</strong> لأن الترقيم يبدأ من <code>0</code>، فإن مصفوفة من 9 عناصر تمتد فهارسها من <code>0</code> إلى <code>8</code>، لذا آخر فهرس هو <code>8</code> (أي <code>size - 1</code>).'
    },
    {
        type: 'tf',
        question: '4. One of the alternatives to nested if is the array.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Final Exam · Fall 2025–2026 · Q1.17 · p. 1',
        explanation: '<strong>التحليل: خطأ!</strong> البديل الشائع لجمل <code>if...else if</code> المتداخلة هو بنية <code>switch</code>، أما المصفوفة (Array) فهي بنية لتخزين البيانات وليست أداة تحكم شرطية.'
    },
    {
        type: 'tf',
        question: '5. sizeof applied to an array gives the number of elements in the array.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Final Exam · Fall 2025–2026 · Q1.18 · p. 1',
        explanation: '<strong>التحليل: خطأ!</strong> معامل <code>sizeof(arr)</code> يعطي إجمالي حجم المصفوفة <strong>بالبايت (Bytes)</strong> وليس عدد عناصرها؛ لحساب عدد العناصر نقسم <bdi dir="ltr">sizeof(arr) / sizeof(arr[0])</bdi>.'
    },
    {
        type: 'tf',
        question: '6. Array elements are stored in contiguous memory locations.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Array Slides (Summer 2026) · p. 6',
        explanation: '<strong>التحليل: صحيح!</strong> تُخزَّن عناصر المصفوفة في مواقع ذاكرة متجاورة ومتصلة (Contiguous memory locations)، مما يجعل الوصول العشوائي عبر الفهرس سريعاً.'
    },
    {
        type: 'tf',
        question: '7. In the declaration int arr[6] = {10, 20, 30, 40};, the remaining two elements arr[4] and arr[5] are automatically initialized to 0.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Array Slides (Summer 2026) · p. 14',
        explanation: '<strong>التحليل: صحيح!</strong> عند تهيئة جزء من عناصر المصفوفة بقائمة قيم أقل من حجمها، يُكمل المترجم بقية العناصر تلقائياً بالقيمة <code>0</code>.'
    },
    {
        type: 'tf',
        question: '8. C++ automatically checks array bounds at runtime and prevents accessing out-of-range indices such as arr[-2].',
        options: ['True', 'False'],
        answer: 1,
        source: 'Array Slides (Summer 2026) · p. 17',
        adaptation: 'Converted code example comment ("index out of bound is not checked") into a True/False statement.',
        explanation: '<strong>التحليل: خطأ!</strong> لغة C++ لا تفحص حدود المصفوفة تلقائياً؛ الوصول إلى فهرس خارج الحدود يؤدي إلى قراءة قيم عشوائية أو سلوك غير معرّف (Undefined Behavior).'
    },

    // 15 Multiple Choice
    {
        type: 'mcq',
        question: '9. What is the output of the following code snippet?',
        code: 'int arr[] = {1, 2, 3, 4, 5};\ncout << arr[3] << endl;',
        options: ['3', '4', '2', '5'],
        answer: 1,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q2.1 · p. 2',
        explanation: '<strong>التحليل:</strong> الفهرس <code>3</code> يشير إلى العنصر الرابع في المصفوفة (0→1، 1→2، 2→3، 3→4)، لذا يُطبع <code>4</code>.'
    },
    {
        type: 'mcq',
        question: '10. Which of the following is the correct way to declare an array in C++?',
        options: ['array = [1, 2, 3];', 'int array[3];', 'array = {1, 2, 3};', 'int array = {1, 2, 3};'],
        answer: 1,
        source: 'Quiz 2 · Fall 2024–2025 · V2 · Q2.5 · p. 3',
        explanation: '<strong>التحليل:</strong> الصيغة الصحيحة للتصريح عن مصفوفة هي تحديد النوع ثم الاسم ثم الحجم بين أقواس مربعة: <bdi dir="ltr">int array[3];</bdi>.'
    },
    {
        type: 'mcq',
        question: '11. Which of the following is true about pointer arithmetic in C++?',
        options: [
            'It only works with scalar integer variables',
            'It can be used to traverse arrays',
            'It causes a runtime error if used with arrays',
            'It can only be used with char pointers'
        ],
        answer: 1,
        source: 'Questions lec.9 · Q7 · p. 2',
        explanation: '<strong>التحليل:</strong> لأن عناصر المصفوفة متجاورة في الذاكرة، فإن زيادة المؤشر (مثل <code>ptr + 1</code>) تنقله مباشرة إلى العنصر التالي.'
    },
    {
        type: 'mcq',
        question: '12. What is the correct syntax for a function header that receives a 1D integer array using a pointer parameter?',
        options: ['void func(int arr[]);', 'void func(int *arr);', 'void func(int &arr);', 'void func(int *arr[]);'],
        answer: 1,
        source: 'Questions lec.9 · Q10 · p. 3',
        adaptation: 'Clarified prompt to specify pointer parameter syntax.',
        explanation: '<strong>التحليل:</strong> عند تمرير مصفوفة لدالة تتحول إلى مؤشر لأول عنصر، لذا الصيغة بالمؤشر هي <bdi dir="ltr">void func(int *arr);</bdi> (ويمكن أيضاً كتابة <code>int arr[]</code> كمكافئ).'
    },
    {
        type: 'mcq',
        question: '13. What is the result of the following code?',
        code: 'int arr[] = {1, 2, 3};\nint *ptr = arr + 1;\ncout << *ptr;',
        options: ['1', '2', '3', '0'],
        answer: 1,
        source: 'Questions lec.9 · Q11 · p. 3',
        explanation: '<strong>التحليل:</strong> <code>arr</code> يشير لأول عنصر (1)، و<code>arr + 1</code> يشير للعنصر الثاني (2)، وفك المرجع <code>*ptr</code> يطبع <code>2</code>.'
    },
    {
        type: 'mcq',
        question: '14. What happens when you use an index or pointer to access memory outside the bounds of an array?',
        options: [
            'The program always stops immediately with a compile error',
            'It safely returns 0',
            'It causes undefined behavior and can crash the program',
            'The program automatically reallocates a larger array'
        ],
        answer: 2,
        source: 'Questions lec.9 · Q12 · p. 3',
        explanation: '<strong>التحليل:</strong> الوصول خارج حدود المصفوفة يسبب سلوكاً غير معرّف (Undefined Behavior) وقد يقرأ بيانات عشوائية أو يفسد الذاكرة أو ينهي البرنامج.'
    },
    {
        type: 'mcq',
        question: '15. What is pointer decay in C++?',
        options: [
            'A pointer automatically loses its reference to a variable',
            'A pointer automatically becomes nullptr after a loop ends',
            'An array automatically decays into a pointer to its first element when passed to a function',
            'A pointer gradually loses its memory address over time'
        ],
        answer: 2,
        source: 'Questions lec.9 · Q20 · p. 5',
        explanation: '<strong>التحليل:</strong> عند تمرير اسم المصفوفة إلى دالة يتحول تلقائياً (Array-to-pointer decay) إلى مؤشر يشير إلى أول عنصر <code>&amp;arr[0]</code>.'
    },
    {
        type: 'mcq',
        question: '16. What is the output of this code snippet?',
        code: 'int arr[] = {1, 2, 3};\nint *ptr = arr + 2;\ncout << *ptr;',
        options: ['1', '2', '3', 'Compilation error'],
        answer: 2,
        source: 'Summary lec.9 · Q26 · p. 7',
        adaptation: 'Converted from Q&A to Multiple Choice.',
        explanation: '<strong>التحليل:</strong> الإزاحة <code>arr + 2</code> تشير إلى العنصر ذي الفهرس 2 (العنصر الثالث)، وقيمته <code>3</code>.'
    },
    {
        type: 'mcq',
        question: '17. What happens when compiling the declaration int arr[2] = { 10, 20, 30, 40, 50 };?',
        options: [
            'The extra elements are ignored silently',
            'The array automatically expands to size 5',
            'A compilation error occurs: too many initializers',
            'Only 10 and 50 are stored'
        ],
        answer: 2,
        source: 'Array Slides (Summer 2026) · p. 18',
        explanation: '<strong>التحليل:</strong> إعطاء قيم تهيئة أكثر من الحجم المحدد <code>[2]</code> يسبب خطأ ترجمة صريحاً: <code>too many initializers for \'int [2]\'</code>.'
    },
    {
        type: 'mcq',
        question: '18. How do you compute the number of elements in a built-in array arr inside the same scope where it was declared?',
        options: [
            'sizeof(arr)',
            'sizeof(arr[0])',
            'sizeof(arr) / sizeof(arr[0])',
            'arr.length()'
        ],
        answer: 2,
        source: 'Array Slides (Summer 2026) · p. 20',
        explanation: '<strong>التحليل:</strong> نقسم الحجم الكلي للمصفوفة بالبايت <code>sizeof(arr)</code> على حجم العنصر الواحد <code>sizeof(arr[0])</code> لنحصل على عدد العناصر.'
    },
    {
        type: 'mcq',
        question: '19. Assuming sizeof(int) is 4 bytes, what value does sizeof(arr) return for int arr[5];?',
        options: ['5', '4', '20', '9'],
        answer: 2,
        source: 'Array Slides (Summer 2026) · p. 19',
        explanation: '<strong>التحليل:</strong> المصفوفة تحتوي على 5 أعداد صحيحة × 4 بايت لكل عدد = <code>20</code> بايت.'
    },
    {
        type: 'mcq',
        question: '20. What size does the compiler assign to the array in int arr[] = { 10, 20, 30, 40 };?',
        options: ['0', '3', '4', 'Compilation error'],
        answer: 2,
        source: 'Array Slides (Summer 2026) · p. 13',
        explanation: '<strong>التحليل:</strong> عند ترك الأقواس فارغة مع قائمة تهيئة، يستنتج المترجم الحجم تلقائياً من عدد العناصر، وهو هنا <code>4</code>.'
    },
    {
        type: 'mcq',
        question: '21. In standard built-in array syntax type arrayName[arraySize];, what must arraySize be?',
        options: [
            'An integer constant greater than zero',
            'Any negative integer',
            'A floating-point constant',
            'Always zero'
        ],
        answer: 0,
        source: 'Array Slides (Summer 2026) · p. 9',
        explanation: '<strong>التحليل:</strong> حجم المصفوفة الثابتة يجب أن يكون ثابتاً صحيحاً أكبر من الصفر (Integer constant &gt; 0).'
    },
    {
        type: 'mcq',
        question: '22. Which of the following is a disadvantage of built-in arrays in C/C++?',
        options: [
            'Random access using index is slow',
            'Fixed size decided at declaration time (cannot grow dynamically)',
            'Cannot traverse elements with a for loop',
            'Elements cannot share the same data type'
        ],
        answer: 1,
        source: 'Array Slides (Summer 2026) · p. 22',
        explanation: '<strong>التحليل:</strong> حجم المصفوفة التقليدية ثابت يُحدد عند التصريح ولا يتغير ديناميكياً أثناء التشغيل، كما أن الإدراج والحذف مكلفان.'
    },
    {
        type: 'mcq',
        question: '23. Given int A[3];, which expression evaluates to a different memory address than &A[0]?',
        options: ['&A', '&A[0]', '&A[1]', 'A'],
        answer: 2,
        source: 'Array Slides (Summer 2026) · p. 5',
        explanation: '<strong>التحليل:</strong> كل من <code>A</code> و<code>&amp;A[0]</code> و<code>&amp;A</code> تبدأ عند عنوان أول عنصر، بينما <code>&amp;A[1]</code> متقدم بمقدار <code>sizeof(int)</code> بايت (4 بايت غالباً).'
    },

    // 12 Essay: Code Writing, Error Correction, Concept & Tracing
    {
        type: 'essay',
        question: '24. Write a C++ program that counts positive and negative numbers in an array named number of ten integers provided by the user.',
        source: 'Final Exam · Fall 2024–2025 · Q6 · p. 4',
        explanation: '<strong>الإجابة النموذجية:</strong> نعرّف مصفوفة <code>int number[10];</code> وعدادين <code>pos = 0</code> و<code>neg = 0</code>، ثم نقرأ 10 أعداد بحلقة <code>for</code> ونفحص إشارة كل عنصر (أكبر من 0 للموجب، وأصغر من 0 للسالب؛ الصفر ليس موجباً ولا سالباً).',
        solutionCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int number[10];\n    int pos = 0, neg = 0;\n\n    for (int i = 0; i < 10; i++) {\n        cin >> number[i];\n        if (number[i] > 0)\n            pos++;\n        else if (number[i] < 0)\n            neg++;\n    }\n\n    cout << "Positive: " << pos << endl;\n    cout << "Negative: " << neg << endl;\n    return 0;\n}'
    },
    {
        type: 'essay',
        question: '25. Write a C++ function printArray(int *arr, int size) that prints all elements of an integer array separated by a space.',
        source: 'Summary lec.9 · Q17 · p. 6',
        explanation: '<strong>الإجابة النموذجية:</strong> نستقبل مؤشر البداية <code>int *arr</code> والحجم <code>int size</code> ونمر بحلقة <code>for</code> من <code>0</code> إلى <code>size - 1</code>.',
        solutionCode: 'void printArray(int *arr, int size) {\n    for (int i = 0; i < size; ++i) {\n        cout << arr[i] << " ";\n    }\n}'
    },
    {
        type: 'essay',
        question: '26. How do you access the n-th (0-indexed) element of an array arr using pointer arithmetic and dereferencing instead of arr[n]?',
        source: 'Summary lec.9 · Q20 · p. 6',
        explanation: '<strong>الإجابة النموذجية:</strong> نضيف الفهرس <code>n</code> إلى عنوان البداية <code>arr</code> ثم نطبق معامل فك المرجع <code>*</code> لقراءة القيمة: <code>*(arr + n)</code>.',
        solutionCode: '*(arr + n);'
    },
    {
        type: 'essay',
        question: '27. Identify and correct the compilation error in the following array declaration.',
        code: 'int arr[2] = { 10, 20, 30, 40, 50 };',
        source: 'Array Slides (Summer 2026) · p. 18',
        explanation: '<strong>الإجابة النموذجية:</strong> عدد قيم التهيئة (5 قيم) أكبر من حجم المصفوفة المحدد (<code>2</code>). التصحيح إما بحذف الحجم <code>int arr[]</code> ليحسبه المترجم (5)، أو تحديد الحجم الصحيح <code>int arr[5]</code> (أو تقليل القيم لاثنتين).',
        solutionCode: 'int arr[5] = { 10, 20, 30, 40, 50 };'
    },
    {
        type: 'essay',
        question: '28. Explain the relationship between an array name and pointers in C++, and why passing an array to a function normally requires passing its size as a separate parameter.',
        source: 'Summary lec.9 · Q7 & Q29 · p. 4, 8',
        explanation: '<strong>الإجابة النموذجية:</strong> اسم المصفوفة يتحول في معظم التعبيرات (ومنها التمرير للدوال) إلى مؤشر يشير إلى أول عنصر <code>&amp;arr[0]</code>. وبسبب هذا التحول (Pointer Decay) تفقد الدالة معلومة طول المصفوفة، لذلك يجب تمرير الحجم <code>size</code> كمعامل مستقل.'
    },
    {
        type: 'essay',
        question: '29. State two advantages and two disadvantages of using built-in arrays in C++.',
        source: 'Array Slides (Summer 2026) · p. 22',
        explanation: '<strong>الإجابة النموذجية:</strong><br><strong>المميزات:</strong> (1) وصول عشوائي سريع لأي عنصر عبر الفهرس. (2) سهولة المرور على جميع العناصر والبحث والترتيب باستخدام حلقة واحدة وأسطر كود أقل.<br><strong>العيوب:</strong> (1) الحجم ثابت يُحدد وقت التصريح ولا يتغير ديناميكياً. (2) عمليات الإدراج والحذف مكلفة لأنها تتطلب إزاحة العناصر أو إعادة حجز ذاكرة.'
    },
    {
        type: 'essay',
        question: '30. Trace the output of the following C++ program.',
        code: 'int arr[5] = {1, 2, 3, 4, 5};\nint x, y, z;\nx = ++arr[1];\ny = arr[2]++;\nz = arr[3] + arr[4];\ncout << x << " " << y << " " << z;',
        source: 'Final Exam · Fall 2024–2025 · Q2(c) · p. 2',
        expectedOutput: '3 3 9',
        explanation: '<strong>التحليل:</strong> <code>arr[1]</code> قيمته 2 و<code>++arr[1]</code> تزيده أولاً إلى <code>3</code> فتصبح <code>x = 3</code>. ثم <code>arr[2]</code> قيمته 3 و<code>arr[2]++</code> تعطي القيمة القديمة <code>3</code> لـ <code>y</code> ثم تزيد <code>arr[2]</code> إلى 4. أخيراً <bdi dir="ltr">z = arr[3] + arr[4] = 4 + 5 = 9</bdi>. المخرج: <code>3 3 9</code>.'
    },
    {
        type: 'essay',
        question: '31. Trace the output of the following C++ program.',
        code: 'int array[] = {3, 2, 4, 9, 7, 5, 3};\nint n, result = 0;\nfor (n = 0; n < 8; n++)\n    result += array[3];\ncout << result;',
        source: 'Final Exam · Fall 2025–2026 · Q2.4 · p. 2',
        expectedOutput: '72',
        explanation: '<strong>التحليل:</strong> انتبه! داخل الحلقة يُجمع <code>array[3]</code> (وهو ثابت قيمته <code>9</code>) وليس <code>array[n]</code>. تتكرر الحلقة 8 مرات (من <code>n = 0</code> إلى <code>n = 7</code>)، لذا <bdi dir="ltr">result = 8 * 9 = 72</bdi>.'
    },
    {
        type: 'essay',
        question: '32. Trace the output of the following C++ program.',
        code: 'int val[] = {3, 7, 9, 5};\nint *valptr = val;\ncout << *valptr;',
        source: 'Final Exam · Fall 2025–2026 · Q2.7 · p. 3',
        adaptation: 'Normalized scanned initializer braces {3, 7, 9, 5}.',
        expectedOutput: '3',
        explanation: '<strong>التحليل:</strong> المؤشر <code>valptr</code> يحمل عنوان أول عنصر في المصفوفة <code>val</code>، لذا <code>*valptr</code> يطبع <code>val[0]</code> أي <code>3</code>.'
    },
    {
        type: 'essay',
        question: '33. Trace the output of the following C++ snippet.',
        code: 'int arr[5];\narr[0] = 5;\narr[2] = -10;\narr[3 / 2] = 2;\narr[3] = arr[0];\ncout << arr[0] << " " << arr[1] << " " << arr[2] << " " << arr[3];',
        source: 'Array Slides (Summer 2026) · p. 15',
        expectedOutput: '5 2 -10 5',
        explanation: '<strong>التحليل:</strong> القسمة الصحيحة <code>3 / 2</code> تعطي <code>1</code>، لذا <code>arr[1] = 2</code>، و<code>arr[3] = arr[0] = 5</code>. النتيجة بالترتيب: <code>5 2 -10 5</code>.'
    },
    {
        type: 'essay',
        question: '34. Trace the output of the following program (assuming sizeof(int) is 4 bytes; preserve line breaks).',
        code: 'int arr[] = {10, 20, 30, 40, 50, 60, 80};\nsize_t total_array_size = sizeof(arr);\nsize_t element_size = sizeof(arr[0]);\nsize_t num_elements = total_array_size / element_size;\ncout << "Total array size (bytes): " << total_array_size << endl;\ncout << "Size of one element (bytes): " << element_size << endl;\ncout << "Number of elements: " << num_elements << endl;',
        source: 'Array Slides (Summer 2026) · p. 20',
        expectedOutput: 'Total array size (bytes): 28\nSize of one element (bytes): 4\nNumber of elements: 7\n',
        explanation: '<strong>التحليل:</strong> المصفوفة بها 7 عناصر من نوع <code>int</code> (كل عنصر 4 بايت)، فيكون الحجم الكلي <code>28</code> بايت، وحجم العنصر <code>4</code>، وعدد العناصر <code>7</code>.'
    },
    {
        type: 'essay',
        question: '35. Trace the output of the following program (ignore trailing space on the number lines).',
        code: 'int arr[6] = {11, 12, 13, 14, 15, 16};\nfor (int i = 0; i < 6; i++)\n    cout << arr[i] << " ";\ncout << endl;\ncout << "By Other Method:" << endl;\nfor (int i = 0; i < 6; i++)\n    cout << i[arr] << " ";',
        source: 'Array Slides (Summer 2026) · p. 21',
        expectedOutput: '11 12 13 14 15 16 \nBy Other Method:\n11 12 13 14 15 16 ',
        explanation: '<strong>التحليل:</strong> التعبير <code>arr[i]</code> يكافئ تماماً <code>*(arr + i)</code> ويكافئ أيضاً <code>*(i + arr)</code> أي <code>i[arr]</code>، لذلك تطبع الحلقتان نفس القيم من 11 إلى 16.'
    }
];
