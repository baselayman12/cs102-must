// Lecture 7 (Pointers, References, Default Arguments, Scope Resolution, Overloading & Recursion)
// Past exam, quiz, and lecture bank selection.
// Snippets assume <iostream> (and <cmath> when needed), using namespace std, and standard C++ placement.
// Original exam numbering is retained in source, independently of quiz numbering.
const quiz7Questions = [
    // 10 True / False (from MUST Final Exams and Quiz 2 papers)
    {
        type: 'tf',
        question: '1. Default Arguments are values provided to parameters during function declaration, which are used when the calling function does not provide values for those parameters.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Final Exam · Fall 2025–2026 · Q1.1 · p. 1',
        explanation: '<strong>التحليل: صحيح!</strong> المعاملات الافتراضية (Default Arguments) تُحدد غالباً في إعلان الدالة (Prototype)، وإذا لم يُمرّر المستدعي قيمة للمعامل تُستخدم القيمة الافتراضية تلقائياً.'
    },
    {
        type: 'tf',
        question: '2. The address operator & can be applied only to constants and to expressions.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q1.7 · p. 1 (also Final Exam · Fall 2025–2026 · Q1.4)',
        explanation: '<strong>التحليل: خطأ!</strong> معامل العنوان <code>&amp;</code> يُطبّق على المتغيرات (lvalues) التي لها عنوان في الذاكرة، ولا يمكن تطبيقه على الثوابت العددية أو التعبيرات المؤقتة.'
    },
    {
        type: 'tf',
        question: '3. An iteration function is a function that calls itself, either directly, or indirectly (through another function).',
        options: ['True', 'False'],
        answer: 1,
        source: 'Final Exam · Fall 2025–2026 · Q1.5 · p. 1 (also Quiz 2 · Fall 2024–2025 · V1 · Q1.11)',
        explanation: '<strong>التحليل: خطأ!</strong> الدالة التي تستدعي نفسها تُسمى <strong>Recursive function</strong> (دالة تكرارية/عودية) وليس Iteration function؛ التكرار (Iteration) يعتمد على الحلقات مثل for وwhile.'
    },
    {
        type: 'tf',
        question: '4. Function overloading allows many functions with the same name and identical parameter types, and the same return types.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Final Exam · Fall 2025–2026 · Q1.11 · p. 1',
        adaptation: 'Clarified phrasing ("but the same return types" -> "and the same return types").',
        explanation: '<strong>التحليل: خطأ!</strong> في Function Overloading يجب أن تختلف الدوال في التوقيع (Signature): أي في عدد المعاملات أو أنواعها أو ترتيبها؛ ولا يجوز تطابق أنواع المعاملات لنفس الاسم في نفس النطاق.'
    },
    {
        type: 'tf',
        question: '5. C++ allows the use of the nullptr keyword to represent a null pointer.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q1.14 · p. 2',
        explanation: '<strong>التحليل: صحيح!</strong> المؤشر الذي يحمل القيمة <code>nullptr</code> لا يشير إلى أي موقع ذاكرة صالح ويُعرف بـ Null Pointer.'
    },
    {
        type: 'tf',
        question: "6. It's possible to have various functions with the same name that operate on different types or numbers of arguments. This is called function overloading.",
        options: ['True', 'False'],
        answer: 0,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q1.15 · p. 2',
        explanation: '<strong>التحليل: صحيح!</strong> هذا هو التعريف الدقيق لـ Function Overloading: دوال بنفس الاسم وتوقيعات مختلفة (عدد أو نوع أو ترتيب المعاملات).'
    },
    {
        type: 'tf',
        question: '7. When an argument is passed by value, the original variable outside the function remains unchanged.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Quiz 2 · Fall 2024–2025 · V2 · Q1.1 · p. 1',
        explanation: '<strong>التحليل: صحيح!</strong> في Pass-by-Value يتم تمرير نسخة من القيمة، وبالتالي أي تعديل داخل الدالة لا يؤثر على المتغير الأصلي.'
    },
    {
        type: 'tf',
        question: "8. Default arguments must be the leftmost arguments in a function's parameter list.",
        options: ['True', 'False'],
        answer: 1,
        source: 'Quiz 2 · Fall 2024–2025 · V2 · Q1.6 · p. 1',
        explanation: '<strong>التحليل: خطأ!</strong> يجب أن تكون المعاملات الافتراضية في أقصى اليمين (<strong>rightmost / trailing</strong>) في قائمة المعاملات.'
    },
    {
        type: 'tf',
        question: '9. A reference must be initialized when it is declared.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Quiz 2 · Fall 2024–2025 · V2 · Q1.7 · p. 1',
        explanation: '<strong>التحليل: صحيح!</strong> المرجع (Reference) مجرد اسم مستعار (Alias) لمتغير موجود، لذا يجب ربطه بمتغير عند التصريح عنه مثل <bdi dir="ltr">int &amp;cRef = count;</bdi>.'
    },
    {
        type: 'tf',
        question: '10. The unary scope resolution operator (::) enables access to a global variable with the same name as a variable in the current scope.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Quiz 2 · Fall 2024–2025 · V2 · Q1.9 · p. 1',
        explanation: '<strong>التحليل: صحيح!</strong> المعامل الأحادي <code>::var</code> يصل للمتغير العام (Global) حتى لو وُجد متغير محلي بنفس الاسم في النطاق الحالي.'
    },

    // 15 Multiple Choice
    {
        type: 'mcq',
        question: '11. What is the unary scope resolution operator in C++?',
        options: ['::', '.', '->', ':'],
        answer: 0,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q2.2 · p. 2',
        explanation: '<strong>التحليل:</strong> معامل النطاق في C++ هو النقطتان المزدوجتان <code>::</code>.'
    },
    {
        type: 'mcq',
        question: '12. What is the correct way to declare a pointer to an int in C++?',
        options: ['int ptr;', 'ptr int;', 'int* ptr;', 'pointer int;'],
        answer: 2,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q2.5 · p. 3',
        explanation: '<strong>التحليل:</strong> للتصريح عن مؤشر نضع النجمة <code>*</code> بين النوع واسم المتغير (مثل <bdi dir="ltr">int* ptr;</bdi> أو <bdi dir="ltr">int *ptr;</bdi>).'
    },
    {
        type: 'mcq',
        question: '13. What is the output of the following code snippet?',
        code: 'int fun(int x = 0, int y = 0);\nint main() {\n    cout << fun(5);\n    return 0;\n}\nint fun(int x, int y) { return (x + y); }',
        options: ['Compiler Error', '0', '10', '5'],
        answer: 3,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q2.11 · p. 4',
        explanation: '<strong>التحليل:</strong> عند استدعاء <code>fun(5)</code> تأخذ <code>x</code> القيمة 5، بينما تأخذ <code>y</code> القيمة الافتراضية 0 من الـ Prototype، فيكون الناتج <bdi dir="ltr">5 + 0 = 5</bdi>.'
    },
    {
        type: 'mcq',
        question: '14. Which of the following is a reference variable declaration in C++?',
        options: ['int x;', 'float y;', 'int& z;', 'double w;'],
        answer: 2,
        source: 'Quiz 2 · Fall 2024–2025 · V2 · Q2.2 · p. 2',
        explanation: '<strong>التحليل:</strong> الرمز <code>&amp;</code> في التصريح يُعرّف متغير مرجع (Reference)، مثل <code>int&amp; z</code> (ملاحظة: المرجع يجب تهيئته أو استخدامه كمعامل دالة).'
    },
    {
        type: 'mcq',
        question: '15. According to the course exam model answer, what is the output of the following code snippet?',
        code: 'void square(int *x, int *y)\n{\n    *x = (*x) * --(*y);\n}\nint main()\n{\n    int number = 30;\n    square(&number, &number);\n    cout << number;\n    return 0;\n}',
        options: ['30', 'Compiler Error', '900', '870'],
        answer: 3,
        source: 'Quiz 2 · Fall 2024–2025 · V2 · Q2.10 · p. 4',
        adaptation: 'Added note referencing the course exam model answer due to pointer aliasing.',
        explanation: '<strong>التحليل:</strong> حسب نموذج إجابة الامتحان الرسمي الناتج <strong>870</strong> (<bdi dir="ltr">30 * 29</bdi>) على اعتبار قراءة <code>*x</code> أولاً بـ 30 ثم إنقاص <code>--(*y)</code> إلى 29. تنبيه مهم: في معيار C++ تمرير عنوان نفس المتغير لكلا المؤشرين مع تعديل أحدهما وقراءة الآخر في نفس التعبير يُعد غير محدد الترتيب (وقد يعطي 841 في بعض المترجمات).'
    },
    {
        type: 'mcq',
        question: '16. References in C++ provide a(n) ________ to an existing variable.',
        options: ['copy', 'alias', 'constant', 'array'],
        answer: 1,
        source: 'Final Exam · Fall 2024–2025 · Q1.10 · p. 1',
        adaptation: 'Converted from Fill-in-the-blank to Multiple Choice.',
        explanation: '<strong>التحليل:</strong> المرجع في C++ يعمل كاسم مستعار (<strong>alias</strong>) لنفس موقع الذاكرة الخاص بالمتغير الأصلي.'
    },
    {
        type: 'mcq',
        question: '17. What does the dereference operator (*) do when applied to a pointer in C++?',
        options: [
            'Assigns a new address automatically',
            "Returns the value stored at the pointer's memory address",
            'Gets the memory address of a variable',
            'Deletes the variable from memory'
        ],
        answer: 1,
        source: 'Questions lec.9 · Q3 · p. 1',
        explanation: '<strong>التحليل:</strong> معامل الإشارة غير المباشرة / فك المرجع <code>*</code> يصل إلى القيمة المخزنة في عنوان الذاكرة الذي يشير إليه المؤشر (Indirection).'
    },
    {
        type: 'mcq',
        question: '18. What does it mean if a pointer is initialized as nullptr?',
        options: [
            'The pointer points to a random memory location',
            'The pointer points to a valid variable automatically',
            'The pointer does not point to any valid memory address',
            'The pointer is automatically dereferenced'
        ],
        answer: 2,
        source: 'Questions lec.9 · Q5 · p. 2',
        explanation: '<strong>التحليل:</strong> المؤشر المهيّأ بـ <code>nullptr</code> لا يشير إلى أي كائن أو عنوان صالح ("points to nothing").'
    },
    {
        type: 'mcq',
        question: '19. What is the purpose of passing arguments by reference in C++?',
        options: [
            'To ensure arguments are immutable',
            'To modify the original arguments directly',
            'To create a copy of the arguments for local use',
            'To prevent accidental modification of the original arguments'
        ],
        answer: 1,
        source: 'Questions lec.8 · Q1 · p. 1',
        explanation: '<strong>التحليل:</strong> التمرير بالمرجع يعطي الدالة المستدعاة وصولاً مباشراً لبيانات المستدعي لتعديلها مباشرة دون نسخ.'
    },
    {
        type: 'mcq',
        question: '20. What happens if a recursive function has no base case?',
        options: [
            'The function calls itself indefinitely until stack overflow / termination',
            'The program compiles but does not execute',
            'The function returns a null value automatically',
            'The compiler inserts a default base case'
        ],
        answer: 0,
        source: 'Questions lec.8 · Q4 · p. 1',
        explanation: '<strong>التحليل:</strong> بدون حالة الأساس (Base Case) لا يتوقف الاستدعاء الذاتي أبداً، مما يستهلك مكدس الاستدعاء (Call Stack) حتى ينهار البرنامج.'
    },
    {
        type: 'mcq',
        question: '21. Why must default arguments in a function always appear at the end (rightmost side) of the parameter list?',
        options: [
            'To reduce the number of variables in main()',
            'To allow omission of only the trailing arguments in function calls',
            'To ensure every argument is explicitly passed',
            'To make the function return multiple values'
        ],
        answer: 1,
        source: 'Questions lec.8 · Q5 · p. 2',
        explanation: '<strong>التحليل:</strong> لأن المعاملات تُطابق بالترتيب من اليسار إلى اليمين؛ إذا تم حذف معامل، يجب حذف كل المعاملات التي تليه على اليمين أيضاً.'
    },
    {
        type: 'mcq',
        question: '22. Which of the following is NOT true about function overloading in C++?',
        options: [
            'Functions can differ by the number of parameters',
            'Functions can differ by the parameter types',
            'Functions can differ only by the return type',
            'Overloaded functions must have different signatures'
        ],
        answer: 2,
        source: 'Questions lec.8 · Q6 · p. 2',
        explanation: '<strong>التحليل:</strong> لا يميز مترجم C++ بين الدوال المحمّلة (Overloaded) بناءً على نوع الإرجاع وحده، بل بناءً على عدد المعاملات أو أنواعها أو ترتيبها.'
    },
    {
        type: 'mcq',
        question: '23. What does the following recursive function return when called with func(4)?',
        code: 'int func(int n) {\n    if (n == 0) return 0;\n    return n + func(n - 1);\n}',
        options: ['0', '10', '15', '24'],
        answer: 1,
        source: 'Questions lec.8 · Q7 · p. 2',
        explanation: '<strong>التحليل:</strong> الدالة تجمع الأعداد من 4 إلى 0: <bdi dir="ltr">4 + 3 + 2 + 1 + 0 = 10</bdi>.'
    },
    {
        type: 'mcq',
        question: '24. What will happen if you attempt to pass a constant literal (e.g., 5) to a non-const reference parameter (int &x) in C++?',
        options: [
            'The function will modify the constant value',
            'A compilation error occurs',
            'The value will be copied and treated as a reference',
            'The compiler converts the constant to a global variable'
        ],
        answer: 1,
        source: 'Questions lec.8 · Q18 · p. 5',
        explanation: '<strong>التحليل:</strong> المرجع غير الثابت (<code>int &amp;x</code>) يحتاج إلى متغير قابل للتعديل (lvalue) ليرتبط به، وتمرير ثابت عددي مثل <code>5</code> يسبب خطأ ترجمة.'
    },
    {
        type: 'mcq',
        question: '25. What is the output when func(3) is called in the following code?',
        code: 'int func(int n) {\n    if (n == 0) return 0;\n    return 2 * func(n - 1) + 1;\n}',
        options: ['0', '3', '7', '15'],
        answer: 2,
        source: 'Questions lec.8 · Q21 · p. 6',
        explanation: '<strong>التحليل:</strong> <bdi dir="ltr">func(0) = 0</bdi> ← <bdi dir="ltr">func(1) = 1</bdi> ← <bdi dir="ltr">func(2) = 3</bdi> ← <bdi dir="ltr">func(3) = 2 * 3 + 1 = 7</bdi>.'
    },

    // 10 Essay: Error Correction, Code Writing, Concept & Tracing
    {
        type: 'essay',
        question: '26. Identify and correct the error in this pointer fragment.',
        code: 'int* number;\ncout << number << endl;',
        source: 'Final Exam · Fall 2024–2025 · Q3.1 · p. 3',
        explanation: '<strong>الإجابة النموذجية:</strong> المؤشر <code>number</code> غير مهيّأ (Uninitialized / Wild pointer) ويحمل قيمة عشوائية؛ يجب تهيئته عند التصريح بـ <code>nullptr</code> أو بعنوان متغير صحيح من نفس النوع باستخدام <code>&amp;</code> قبل استخدامه.',
        solutionCode: 'int val = 10;\nint* number = &val;\ncout << *number << endl;'
    },
    {
        type: 'essay',
        question: '27. Write a C++ program that finds the root of a Number using function overloading. Calculate the root if you insert an integer number or insert a double number and return the value of root(n).',
        source: 'Final Exam · Fall 2025–2026 · Q3.1 · p. 4',
        explanation: '<strong>الإجابة النموذجية:</strong> نعرّف دالتين بنفس الاسم <code>root</code> بتوقيعين مختلفين: الأولى تأخذ <code>int n</code> والثانية تأخذ <code>double n</code>، وتستخدمان <code>sqrt()</code> من مكتبة <code>&lt;cmath&gt;</code>.',
        solutionCode: '#include <iostream>\n#include <cmath>\nusing namespace std;\n\ndouble root(int n) {\n    return sqrt(n);\n}\n\ndouble root(double n) {\n    return sqrt(n);\n}\n\nint main() {\n    int a = 16;\n    double b = 20.25;\n    cout << "Root of int: " << root(a) << endl;\n    cout << "Root of double: " << root(b) << endl;\n    return 0;\n}'
    },
    {
        type: 'essay',
        question: '28. Write a function named cubeVolume that calculates and returns the volume of a cube with a default side length of 2.',
        source: 'Summary lec.8 · Q5 · p. 4',
        explanation: '<strong>الإجابة النموذجية:</strong> نحدد القيمة الافتراضية <code>side = 2</code> في قائمة المعاملات، ونرجع <code>side * side * side</code>.',
        solutionCode: 'int cubeVolume(int side = 2) {\n    return side * side * side;\n}'
    },
    {
        type: 'essay',
        question: '29. Write a recursive C++ function factorial(int n) to calculate the factorial of a nonnegative integer n.',
        source: 'Summary lec.8 · Q13 · p. 5',
        explanation: '<strong>الإجابة النموذجية:</strong> حالة الأساس هي <code>n &lt;= 1</code> فترجع <code>1</code> (لأن 0! = 1 و1! = 1)، وخطوة الاستدعاء الذاتي هي <code>n * factorial(n - 1)</code>.',
        solutionCode: 'unsigned long factorial(unsigned long n) {\n    if (n <= 1)\n        return 1;\n    else\n        return n * factorial(n - 1);\n}'
    },
    {
        type: 'essay',
        question: '30. Can the unary scope resolution operator (::) be used to access a local variable of the same name in an outer block? Explain what it accesses instead.',
        source: 'Summary lec.8 · Q7 · p. 4',
        explanation: '<strong>الإجابة النموذجية:</strong> <strong>لا (No).</strong> المعامل الأحادي <code>::</code> يصل فقط إلى <strong>المتغيرات العامة (Global variables)</strong> عندما يحجبها متغير محلي بنفس الاسم، ولا يمكنه الوصول إلى متغير محلي في كتلة خارجية (Outer block).'
    },
    {
        type: 'essay',
        question: '31. Trace the output of the following C++ program.',
        code: 'int fun(int x = 0, int y = 1);\nint main() {\n    cout << fun(5);\n    return 0;\n}\nint fun(int x, int y) { return (x * y); }',
        source: 'Final Exam · Fall 2025–2026 · Q2.5 · p. 2',
        expectedOutput: '5',
        explanation: '<strong>التحليل:</strong> عند استدعاء <code>fun(5)</code> تصبح <code>x = 5</code> وتأخذ <code>y</code> القيمة الافتراضية <code>1</code>، فتُرجع الدالة <bdi dir="ltr">5 * 1 = 5</bdi>.'
    },
    {
        type: 'essay',
        question: '32. Trace the output of the following C++ program (pay close attention to pass-by-value vs. pass-by-reference and line breaks).',
        code: 'void fun(int A, int &B) {\n    A = A + B;\n    B = A - B;\n    A = A - B;\n    cout << A << " ";\n    cout << B << endl;\n}\nint main() {\n    int a = 2, b = 16;\n    fun(a, b);\n    cout << a << ", " << b << endl;\n    return 0;\n}',
        source: 'Final Exam · Fall 2025–2026 · Q2.8 · p. 3',
        expectedOutput: '16 2\n2, 2\n',
        explanation: '<strong>التحليل:</strong> <code>A</code> مُمرر بالقيمة و<code>B</code> مُمرر بالمرجع (Alias لـ <code>b</code>). داخل <code>fun</code>: يصبح <bdi dir="ltr">A = 18</bdi> ثم <bdi dir="ltr">B = 18 - 16 = 2</bdi> ثم <bdi dir="ltr">A = 18 - 2 = 16</bdi>، فيطبع السطر الأول <code>16 2</code>. بعد العودة إلى <code>main</code> تبقى <code>a = 2</code> كما هي بينما تغيرت <code>b</code> عبر <code>B</code> لتصبح <code>2</code>، فيطبع السطر الثاني <code>2, 2</code>.'
    },
    {
        type: 'essay',
        question: '33. Trace the output of the following C++ program.',
        code: 'int calc(int n) {\n    int result = 1;\n    while (n > 1) {\n        result *= n;\n        n--;\n    }\n    return result;\n}\nint main() {\n    cout << calc(5) << endl;\n    return 0;\n}',
        source: 'Final Exam · Fall 2025–2026 · Q2.10 · p. 3',
        expectedOutput: '120\n',
        explanation: '<strong>التحليل:</strong> الدالة تحسب مضروب العدد 5 تكرارياً (Iterative Factorial): <bdi dir="ltr">1 * 5 * 4 * 3 * 2 = 120</bdi>.'
    },
    {
        type: 'essay',
        question: '34. Trace the output of the following pointer snippet.',
        code: 'int x = 10;\nint *ptr = &x;\n*ptr = *ptr + 5;\ncout << x;',
        source: 'Questions lec.9 · Q14 · p. 4',
        adaptation: 'Converted from MCQ to output tracing.',
        expectedOutput: '15',
        explanation: '<strong>التحليل:</strong> <code>ptr</code> يخزن عنوان <code>x</code>، لذا <code>*ptr</code> يشير مباشرة إلى قيمة <code>x</code>. تنفيذ <code>*ptr = *ptr + 5</code> يزيد قيمة <code>x</code> من 10 إلى 15.'
    },
    {
        type: 'essay',
        question: '35. Trace the output of the following program using default arguments (preserve line breaks).',
        code: 'unsigned int boxVolume(unsigned int length = 1, unsigned int width = 1, unsigned int height = 1);\n\nint main() {\n    cout << boxVolume() << endl;\n    cout << boxVolume(10) << endl;\n    cout << boxVolume(10, 5) << endl;\n    cout << boxVolume(10, 5, 2) << endl;\n    return 0;\n}\n\nunsigned int boxVolume(unsigned int length, unsigned int width, unsigned int height) {\n    return length * width * height;\n}',
        source: 'Lecture 7 Slides (lect 7-Fall 2026-2027) · p. 26',
        adaptation: 'Simplified output lines from Fig. 6.21 to focus on the four numeric results.',
        expectedOutput: '1\n10\n50\n100\n',
        explanation: '<strong>التحليل:</strong> الاستدعاءات بالترتيب: <bdi dir="ltr">1*1*1 = 1</bdi>، ثم <bdi dir="ltr">10*1*1 = 10</bdi>، ثم <bdi dir="ltr">10*5*1 = 50</bdi>، ثم <bdi dir="ltr">10*5*2 = 100</bdi>.'
    }
];
