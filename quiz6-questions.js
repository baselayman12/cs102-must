// Lecture 6 (Functions) past exam, quiz, and lecture bank selection.
// Snippets assume <iostream> (and <cmath> when math functions are used), using namespace std, and standard C++ placement.
// Original exam numbering is retained in source, independently of quiz numbering.
const quiz6Questions = [
    // 8 True / False
    {
        type: 'tf',
        question: '1. The keyword void is used in a function header to indicate that a function does not return a value or to indicate that a function contains no parameters.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q1.3 · p. 1',
        explanation: '<strong>التحليل: صحيح!</strong> تُستخدم void كنوع إرجاع للدلالة على أن الدالة لا تعيد قيمة، أو داخل الأقواس void func(void) للدلالة على عدم وجود معاملات.'
    },
    {
        type: 'tf',
        question: '2. A function prototype tells the compiler the name of the function and the types of its arguments.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q1.10 · p. 1',
        explanation: '<strong>التحليل: خطأ!</strong> هذا الوصف ينقصه نوع الإرجاع وعدد المعاملات وترتيبها. الـ Function Prototype يُخبر المترجم بالاسم، نوع القيمة المرجعة، عدد المعاملات، أنواعها، وترتيبها؛ بينما الاسم وأنواع المعاملات فقط يُسمى Function Signature.'
    },
    {
        type: 'tf',
        question: '3. ceil(x) is the math library function that rounds x to the smallest integer not less than x.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q1.12 · p. 2',
        explanation: '<strong>التحليل: صحيح!</strong> الدالة ceil(x) من مكتبة &lt;cmath&gt; تقرّب للأعلى إلى أصغر عدد صحيح لا يقل عن x (مثلاً ceil(9.2) تعطي 10.0 وceil(-9.8) تعطي -9.0).'
    },
    {
        type: 'tf',
        question: '4. In C++, a function can return more than one value using multiple return statements.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Quiz 2 · Fall 2024–2025 · V2 · Q1.3 · p. 1',
        explanation: '<strong>التحليل: خطأ!</strong> الدالة في C++ تُرجع قيمة واحدة فقط مباشرةً، وتنهي جملة return تنفيذ الدالة فوراً عند أول return يتم الوصول إليها.'
    },
    {
        type: 'tf',
        question: '5. floor(x) is the math library function that rounds x to the largest integer not greater than x.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Quiz 2 · Fall 2024–2025 · V2 · Q1.11 · p. 1',
        explanation: '<strong>التحليل: صحيح!</strong> الدالة floor(x) تقرّب للأسفل إلى أكبر عدد صحيح لا يزيد عن x (مثلاً floor(9.2) تعطي 9.0 وfloor(-9.8) تعطي -10.0).'
    },
    {
        type: 'tf',
        question: '6. floor(x) is the math library function that rounds x to the largest integer not less than x.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Final Exam · Fall 2025–2026 · Q1.3 · p. 1',
        explanation: '<strong>التحليل: خطأ!</strong> عبارة "not less than x" تخص ceil(x) وليس floor(x). دالة floor(x) تقرّب إلى أكبر عدد صحيح لا يزيد عن x (not greater than x).'
    },
    {
        type: 'tf',
        question: '7. The int data type is used to indicate that a function does not return a value.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Final Exam · Fall 2025–2026 · Q1.20 · p. 1',
        adaptation: 'Grammar polished for clarity without changing meaning.',
        explanation: '<strong>التحليل: خطأ!</strong> الكلمة المحجوزة void هي التي تشير إلى أن الدالة لا ترجع قيمة، أما int فتعني أن الدالة ترجع عدداً صحيحاً.'
    },
    {
        type: 'tf',
        question: '8. Two functions in the same scope can share the exact same function signature without causing a compilation error.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Summary lec.7 · Q18 · p. 4',
        adaptation: 'Converted from open-ended Q&A to a True/False statement.',
        explanation: '<strong>التحليل: خطأ!</strong> يجب أن تمتلك الدوال في نفس النطاق (Scope) تواقيع (Signatures) فريدة ومختلفة، وإلا يحدث خطأ ترجمة (Compilation Error) بسبب الالتباس.'
    },

    // 15 Multiple Choice
    {
        type: 'mcq',
        question: '9. Which statement is used to exit a function and return a value in C++?',
        options: ['exit(0);', 'return 0;', 'break;', 'continue;'],
        answer: 1,
        source: 'Quiz 2 · Fall 2024–2025 · V1 · Q2.12 · p. 4',
        explanation: '<strong>التحليل:</strong> الجملة <bdi dir="ltr">return 0;</bdi> تنهي الدالة وتعيد القيمة إلى المستدعي. أما break وcontinue فللحلقات/switch، وexit(0) دالة لإنهاء البرنامج كله.'
    },
    {
        type: 'mcq',
        question: '10. Which of the following is considered the default return type of functions in C++ (according to legacy C-style syntax used in the course slides)?',
        options: ['int', 'char', 'float', 'void'],
        answer: 0,
        source: 'Quiz 2 · Fall 2024–2025 · V2 · Q2.12 · p. 4',
        adaptation: 'Clarified that this follows the course exam key and legacy C-style main() in lecture slides.',
        explanation: '<strong>التحليل:</strong> حسب نموذج إجابة الامتحان (وشكل main() بدون نوع إرجاع في السلايدات)، الافتراضي هو int. ملاحظة: في معيار C++ الحديث يجب كتابة نوع الإرجاع صراحةً لجميع الدوال.'
    },
    {
        type: 'mcq',
        question: '11. In a C++ program, where does execution always begin when the program is launched?',
        options: ['The global variable declarations', 'The std::cout statement', 'The main function', 'The first #include line'],
        answer: 2,
        source: 'Exam(1) · Fall 2026 · Model C · Q1.11 · p. 2',
        explanation: '<strong>التحليل:</strong> يبدأ تنفيذ أي برنامج C++ قياسي من الدالة <bdi dir="ltr">main()</bdi> مهما كان ترتيب الدوال في الملف.'
    },
    {
        type: 'mcq',
        question: '12. What value returned by main() indicates to the operating system that the C++ program completed successfully?',
        options: ['0', '-1', '1', '100'],
        answer: 0,
        source: 'Exam(1) · Fall 2026 · Model C · Q1.13 · p. 2',
        explanation: '<strong>التحليل:</strong> إرجاع القيمة 0 من main() يخبر نظام التشغيل أن البرنامج انتهى بنجاح دون أخطاء.'
    },
    {
        type: 'mcq',
        question: '13. Which of the following is NOT listed as a C++ control structure?',
        options: ['if-else', 'switch', 'for', 'function'],
        answer: 3,
        source: 'Exam(1) · Fall 2026 · Model C · Q1.19 · p. 2',
        explanation: '<strong>التحليل:</strong> الدالة (function) هي وحدة بناء برمجية لتقسيم الكود (Modularization) وليست بنية تحكم مثل if-else وswitch وfor.'
    },
    {
        type: 'mcq',
        question: '14. Which of the following is true about functions in C++?',
        options: [
            'Functions must always return a value',
            'Functions can return at most one value',
            'Functions can return multiple values directly',
            'Functions must always take arguments'
        ],
        answer: 1,
        source: 'Questions lec.7 · Q1 · p. 1',
        explanation: '<strong>التحليل:</strong> الدالة في C++ لا تستطيع أن ترجع مباشرةً أكثر من قيمة واحدة (إما قيمة واحدة أو لا شيء باستخدام void).'
    },
    {
        type: 'mcq',
        question: '15. What is the purpose of a function prototype in C++?',
        options: [
            'To define the logic of the function',
            'To specify how a function can be called',
            'To declare variables used inside the function',
            'To optimize function execution'
        ],
        answer: 1,
        source: 'Questions lec.7 · Q2 · p. 1',
        explanation: '<strong>التحليل:</strong> الـ Prototype يخبر المترجم باسم الدالة ونوع إرجاعها وعدد وأنواع وترتيب معاملاتها حتى يتمكن من التحقق من صحة استدعائها قبل تعريف جسمها.'
    },
    {
        type: 'mcq',
        question: '16. What does the <cmath> library primarily provide in C++?',
        options: [
            'Input/output operations',
            'Data type definitions',
            'Mathematical functions',
            'String manipulations'
        ],
        answer: 2,
        source: 'Questions lec.7 · Q4 · p. 1',
        explanation: '<strong>التحليل:</strong> مكتبة &lt;cmath&gt; توفر الدوال الرياضية الجاهزة مثل sqrt وpow وceil وfloor وsin وcos.'
    },
    {
        type: 'mcq',
        question: '17. Which of the following statements about user-defined functions is true?',
        options: [
            'They cannot return a value',
            'They must always take at least one argument',
            'They are functions defined by the user to perform specific tasks',
            'They are the same as library functions'
        ],
        answer: 2,
        source: 'Questions lec.7 · Q5 · p. 2',
        explanation: '<strong>التحليل:</strong> الدوال المعرّفة من المستخدم (User-defined functions) يكتبها المبرمج لتنفيذ مهام محددة وتنظيم الكود وإعادة استخدامه.'
    },
    {
        type: 'mcq',
        question: '18. What is the return type of the following function: int multiply(int a, int b)?',
        options: ['void', 'int', 'float', 'double'],
        answer: 1,
        source: 'Questions lec.7 · Q6 · p. 2',
        explanation: '<strong>التحليل:</strong> نوع الإرجاع يكتب قبل اسم الدالة في الرأس (Header)، وهنا هو int.'
    },
    {
        type: 'mcq',
        question: '19. What will the result of sqrt(pow(3.0, 2.0) + pow(4.0, 2.0)) be?',
        options: ['5.0', '25.0', '7.0', '0.0'],
        answer: 0,
        source: 'Questions lec.7 · Q8 · p. 2',
        explanation: '<strong>التحليل:</strong> <bdi dir="ltr">pow(3.0, 2.0) = 9.0</bdi> و<bdi dir="ltr">pow(4.0, 2.0) = 16.0</bdi>، ومجموعهما 25.0، والجذر التربيعي sqrt(25.0) هو 5.0.'
    },
    {
        type: 'mcq',
        question: '20. In the context of C++, what does the term "scope of a function" mean?',
        options: [
            'The time a function takes to execute',
            'The region of a program where the function is accessible',
            'The memory required by the function',
            'The arguments passed to the function'
        ],
        answer: 1,
        source: 'Questions lec.7 · Q12 · p. 3',
        explanation: '<strong>التحليل:</strong> نطاق الدالة (Scope) هو المنطقة من البرنامج التي تكون فيها الدالة معروفة ويمكن استدعاؤها.'
    },
    {
        type: 'mcq',
        question: '21. Which of these is a valid prototype for a function named calculate returning a double with no parameters?',
        options: [
            'calculate double();',
            'double calculate();',
            'void calculate(double);',
            'double calculate(double, double);'
        ],
        answer: 1,
        source: 'Questions lec.7 · Q13 · p. 3',
        adaptation: 'Added "with no parameters" and missing semicolons on options for precision.',
        explanation: '<strong>التحليل:</strong> الصيغة الصحيحة للـ Prototype هي <bdi dir="ltr">double calculate();</bdi> حيث يسبق نوع الإرجاع اسمَ الدالة وقائمة المعاملات وتنتهي بفاصلة منقوطة.'
    },
    {
        type: 'mcq',
        question: '22. Which of the following represents an empty parameter list in a C++ function?',
        options: [
            'void functionName();',
            'void functionName(void);',
            'Both a and b',
            'None of the above'
        ],
        answer: 2,
        source: 'Questions lec.7 · Q20 · p. 5',
        explanation: '<strong>التحليل:</strong> في C++ يمكن التعبير عن قائمة معاملات فارغة إما بترك الأقواس فارغة () أو بكتابة void داخل الأقواس (void).'
    },
    {
        type: 'mcq',
        question: '23. What happens if a void function tries to return a value (e.g., return 5;)?',
        options: [
            'It results in undefined behavior',
            'It generates a compilation error',
            'It returns 0 by default',
            'The return value is ignored'
        ],
        answer: 1,
        source: 'Questions lec.7 · Q21 · p. 5',
        explanation: '<strong>التحليل:</strong> الدالة من النوع void لا ترجع قيمة، ومحاولة إرجاع قيمة منها تسبب خطأ ترجمة (Compilation Error). يمكن فقط استخدام <bdi dir="ltr">return;</bdi> بدون قيمة للخروج منها.'
    },

    // 12 Essay: Error Correction, Code Completion, Code Writing, Concept & Tracing
    {
        type: 'essay',
        question: '24. Identify and correct all errors in this function definition.',
        code: 'void f( double a );\n{\n    float a;\n    cout << a << endl;\n}',
        source: 'Final Exam · Fall 2024–2025 · Q3.5 · p. 3',
        explanation: '<strong>الإجابة النموذجية:</strong> يوجد خطآن: (1) وجود فاصلة منقوطة <code>;</code> في نهاية رأس الدالة قبل جسمها <code>{ }</code>، مما يجعلها إعلاناً غير مكتمل. (2) إعادة تعريف متغير محلي <code>float a;</code> بنفس اسم المعامل <code>a</code> في نفس النطاق. التصحيح بإزالة الفاصلة المنقوطة وإزالة إعادة التعريف لطباعة المعامل مباشرة.',
        solutionCode: 'void f( double a )\n{\n    cout << a << endl;\n}'
    },
    {
        type: 'essay',
        question: '25. Complete the missing function header so the program compiles and prints "The min value is: 1".',
        code: '// Write the missing function header here.\n{\n    if (a < b && a < c) return a;\n    else if (b < c)     return b;\n    else                return c;\n}\nint main()\n{\n    int x = 1, y = 2, z = 3;\n    cout << "The min value is: " << min(x, y, z) << endl;\n    return 0;\n}',
        source: 'Quiz 2 Model Answer · Fall 2023–2024 · V2 · Q3.5 · p. 2',
        adaptation: 'Added return 0; in main for standard C++ completeness.',
        explanation: '<strong>الإجابة النموذجية:</strong> الدالة تُستدعى بالاسم <code>min</code> وتستقبل 3 أعداد صحيحة وتقارن بين <code>a</code> و<code>b</code> و<code>c</code> وترجع الأصغر من نوع <code>int</code>، لذا يكون الرأس المطلوب: <code>int min(int a, int b, int c)</code>.',
        solutionCode: 'int min(int a, int b, int c)\n{\n    if (a < b && a < c) return a;\n    else if (b < c)     return b;\n    else                return c;\n}'
    },
    {
        type: 'essay',
        question: '26. Write a C++ program that finds the Cube of a Number using a function. The function should take a float argument and return the value of cube(n).',
        source: 'Final Exam · Fall 2024–2025 · Q5 · p. 4',
        explanation: '<strong>الإجابة النموذجية:</strong> نعرّف دالة باسم <code>cube</code> تستقبل معامل <code>float n</code> وترجع <code>n * n * n</code> من نوع <code>float</code>، ثم نستدعيها داخل <code>main()</code>.',
        solutionCode: '#include <iostream>\nusing namespace std;\n\nfloat cube(float n) {\n    return n * n * n;\n}\n\nint main() {\n    float num;\n    cout << "Enter a number: ";\n    cin >> num;\n    cout << "Cube = " << cube(num) << endl;\n    return 0;\n}'
    },
    {
        type: 'essay',
        question: '27. Write a C++ program to evaluate the equation f(x) = x^8 + sin(x) + 1 using functions, when x = 5.',
        source: 'Final Exam · Fall 2025–2026 · Q3.2 · p. 4',
        explanation: '<strong>الإجابة النموذجية:</strong> نستخدم مكتبة <code>&lt;cmath&gt;</code> لحساب الأس <code>pow(x, 8)</code> وجيب الزاوية <code>sin(x)</code> (بالتقدير الدائري radians) داخل دالة <code>f(double x)</code> ثم نستدعيها عند <code>x = 5</code>.',
        solutionCode: '#include <iostream>\n#include <cmath>\nusing namespace std;\n\ndouble f(double x) {\n    return pow(x, 8) + sin(x) + 1;\n}\n\nint main() {\n    double x = 5;\n    cout << "f(5) = " << f(x) << endl;\n    return 0;\n}'
    },
    {
        type: 'essay',
        question: '28. Write a function prototype for a function named multiply that takes two double arguments and returns a double.',
        source: 'Summary lec.7 · Q17 · p. 4',
        explanation: '<strong>الإجابة النموذجية:</strong> الـ Prototype يحتوي على نوع الإرجاع <code>double</code> ثم الاسم <code>multiply</code> ثم أنواع المعاملات بين قوسين، وينتهي بفاصلة منقوطة (أسماء المعاملات اختيارية في الـ prototype).',
        solutionCode: 'double multiply(double x, double y);'
    },
    {
        type: 'essay',
        question: '29. Write a C++ function named printHello that prints "Hello, World!" without taking any parameters and without returning a value.',
        source: 'Summary lec.7 · Q27 · p. 5',
        explanation: '<strong>الإجابة النموذجية:</strong> نستخدم نوع الإرجاع <code>void</code> وقائمة معاملات فارغة <code>()</code> أو <code>(void)</code>.',
        solutionCode: 'void printHello() {\n    cout << "Hello, World!";\n}'
    },
    {
        type: 'essay',
        question: '30. Write a function prototype named areaOfCircle to calculate the area of a circle, taking a double radius as input and returning a double.',
        source: 'Summary lec.7 · Q30 · p. 5',
        explanation: '<strong>الإجابة النموذجية:</strong> الإعلان يحدد نوع الإرجاع <code>double</code> واسم الدالة <code>areaOfCircle</code> ومعاملاً واحداً من نوع <code>double</code>.',
        solutionCode: 'double areaOfCircle(double radius);'
    },
    {
        type: 'essay',
        question: '31. Suppose a function has the prototype int calculate(int x, int y); and is called as calculate(3);. What error occurs and why?',
        source: 'Questions lec.7 · Q24 · p. 6',
        adaptation: 'Converted from MCQ to open-ended diagnostic question.',
        explanation: '<strong>الإجابة النموذجية:</strong> يحدث <strong>خطأ ترجمة (Compilation Error)</strong> بسبب عدم كفاية الوسائط (Insufficient arguments)؛ لأن الدالة تتوقع معاملين من نوع <code>int</code> ولا توجد قيم افتراضية (Default Arguments) للمعامل الثاني.'
    },
    {
        type: 'essay',
        question: '32. What are global functions in C++? Mention two examples covered in Lecture 6.',
        source: 'Summary lec.7 · Q3 · p. 2',
        explanation: '<strong>الإجابة النموذجية:</strong> الدوال العامة (Global functions) هي دوال لا تنتمي إلى أي كلاس (Class) ويمكن استدعاؤها مباشرة باسمها. أمثلة من المحاضرة: الدالة <code>main()</code>، وجميع دوال مكتبة الرياضيات <code>&lt;cmath&gt;</code> مثل <code>sqrt()</code> و<code>pow()</code> و<code>ceil()</code>.'
    },
    {
        type: 'essay',
        question: '33. What is a function signature, and how does it differ from a function prototype?',
        source: 'Summary lec.7 · Q8 · p. 3',
        explanation: '<strong>الإجابة النموذجية:</strong> توقيع الدالة (<strong>Function Signature</strong>) هو الجزء من الإعلان الذي يتضمن <strong>اسم الدالة وأنواع معاملاتها</strong> فقط، ولا يشمل نوع الإرجاع. أما الـ <strong>Function Prototype</strong> فيشمل بالإضافة إلى ذلك نوع القيمة المرجعة وعدد المعاملات وترتيبها.'
    },
    {
        type: 'essay',
        question: '34. Trace the output of the following C++ program (including line breaks).',
        code: 'float x = 9.2;\nint y = 2, z = 3;\ncout << ceil(x) << endl;\ncout << floor(x) << endl;\ncout << pow(y, z) << endl;',
        source: 'Lecture 6 Slides (lect 6 -Fall 2026-2027) · p. 14',
        adaptation: 'Extracted snippet assuming <iostream> and <cmath> inside main.',
        expectedOutput: '10\n9\n8\n',
        explanation: '<strong>التحليل:</strong> الدالة <code>ceil(9.2)</code> تقرّب للأعلى فتعطي <code>10</code>، والدالة <code>floor(9.2)</code> تقرّب للأسفل فتعطي <code>9</code>، والدالة <code>pow(2, 3)</code> تحسب 2 أس 3 فتعطي <code>8</code>.'
    },
    {
        type: 'essay',
        question: '35. Trace the output of the following C++ program.',
        code: 'int add(int a, int b) {\n    return a + b;\n}\nint main() {\n    int a = 1, b = 2, c, d;\n    c = d = add(a, b);\n    cout << add(c, d) << endl;\n    return 0;\n}',
        source: 'Lecture 6 Slides (lect 6 -Fall 2026-2027) · p. 31',
        adaptation: 'Replaced interactive cin >> a >> b with a = 1, b = 2 (the slide sample input) and used int main().',
        expectedOutput: '6\n',
        explanation: '<strong>التحليل:</strong> أولاً <code>add(1, 2)</code> ترجع <code>3</code>، وبإسناد متسلسل تصبح <code>d = 3</code> ثم <code>c = 3</code>. بعدها <code>add(c, d)</code> تحسب <code>3 + 3</code> فتطبع <code>6</code>.'
    }
];
