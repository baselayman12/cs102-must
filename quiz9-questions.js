// Lecture 9 (C++ Structures / struct) past exam, quiz, and lecture bank selection.
// Snippets assume <iostream> (and <string> when string is used), using namespace std, and standard C++ placement.
// Original exam numbering is retained in source, independently of quiz numbering.
const quiz9Questions = [
    // 8 True / False
    {
        type: 'tf',
        question: '1. Unlike arrays, structures in C++ are user-defined data types that can group items of possibly different data types under a single name.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Structures Slides (Summer 2026) · p. 2',
        explanation: '<strong>التحليل: صحيح!</strong> المصفوفة تخزن عناصر من نفس النوع فقط، أما الـ <code>struct</code> فنوع بيانات يعرّفه المستخدم لتجميع حقول قد تختلف أنواعها (مثل <code>string</code> و<code>int</code> و<code>float</code>) تحت اسم واحد.'
    },
    {
        type: 'tf',
        question: '2. A structure variable can only be declared separately inside main(), and cannot be declared immediately with the structure definition.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Structures Slides (Summer 2026) · p. 5',
        explanation: '<strong>التحليل: خطأ!</strong> يمكن التصريح عن متغير من نوع البنية إما مع تعريف البنية مباشرة مثل <bdi dir="ltr">struct Point { int x, y; } p1;</bdi> أو بشكل منفصل داخل <code>main()</code> مثل <bdi dir="ltr">Point p1;</bdi>.'
    },
    {
        type: 'tf',
        question: '3. Members of a structure variable are accessed using the dot (.) operator.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Structures Slides (Summer 2026) · p. 6',
        explanation: '<strong>التحليل: صحيح!</strong> للوصول إلى أي عضو داخل متغير بنية نستخدم عامل النقطة <code>.</code> مثل <code>p1.age = 50;</code> (بينما مع المؤشر نستخدم <code>-&gt;</code>).'
    },
    {
        type: 'tf',
        question: '4. A structure in C++ can contain arrays as its members.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Questions lec.10 · Q5 · p. 1–2',
        explanation: '<strong>التحليل: صحيح!</strong> يمكن أن يحتوي الـ <code>struct</code> على مصفوفات ضمن أعضائه مثل <code>int marks[5];</code> أو <code>char partName[26];</code>.'
    },
    {
        type: 'tf',
        question: '5. Structures in C++ can contain other structures as members (nested structures).',
        options: ['True', 'False'],
        answer: 0,
        source: 'Questions lec.10 · Q11 · p. 3',
        explanation: '<strong>التحليل: صحيح!</strong> يمكن تعريف بنية داخل أخرى أو استخدام متغير بنية كعضو داخل بنية أخرى (Nested Structures).'
    },
    {
        type: 'tf',
        question: '6. A structure variable can be returned from a function in C++.',
        options: ['True', 'False'],
        answer: 0,
        source: 'Questions lec.10 · Q18 · p. 4',
        explanation: '<strong>التحليل: صحيح!</strong> يمكن للدالة إرجاع بنية بالقيمة (Return by value) أو عبر مؤشر أو مرجع.'
    },
    {
        type: 'tf',
        question: '7. In C++, members of a struct default to private access, just like in a class.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Summary lec.10 · Hard Q5 · p. 4',
        adaptation: 'Converted Q&A comparison into a True/False statement.',
        explanation: '<strong>التحليل: خطأ!</strong> أعضاء الـ <code>struct</code> في C++ يكونون افتراضياً عامين (<code>public</code>)، على عكس الـ <code>class</code> الذي يكون أعضاؤه افتراضياً خاصين (<code>private</code>).'
    },
    {
        type: 'tf',
        question: '8. When a local structure variable is declared without initialization (and without default member initializers), C++ automatically sets all its members to zero.',
        options: ['True', 'False'],
        answer: 1,
        source: 'Summary lec.10 · Hard Q2 · p. 4',
        adaptation: 'Converted from open-ended Q&A to a True/False statement.',
        explanation: '<strong>التحليل: خطأ!</strong> المتغيرات المحلية غير المهيأة من نوع <code>struct</code> (دون قيم افتراضية للأعضاء) تحمل قيماً عشوائية غير محددة (Garbage values).'
    },

    // 17 Multiple Choice
    {
        type: 'mcq',
        question: '9. Which keyword introduces a structure declaration in C++?',
        options: ['class', 'struct', 'enum', 'typedef'],
        answer: 1,
        source: 'Final Exam · Fall 2024–2025 · Q1.2 · p. 1 (also Questions lec.10 · Q3)',
        adaptation: 'Converted from Fill-in-the-blank to Multiple Choice.',
        explanation: '<strong>التحليل:</strong> الكلمة المحجوزة <code>struct</code> هي المستخدمة لتعريف البنية (Structure) في C++.'
    },
    {
        type: 'mcq',
        question: '10. What is the correct way to declare a structure in C++?',
        options: [
            'struct {string name; int age;} Person;',
            'struct Person {string name; int age;};',
            'structure Person {string name; int age;};',
            'struct {name: string; age: int;} Person;'
        ],
        answer: 1,
        source: 'Questions lec.10 · Q1 · p. 1',
        explanation: '<strong>التحليل:</strong> تكتب الكلمة <code>struct</code> ثم اسم البنية <code>Person</code> ثم الأعضاء بين <code>{ }</code> وتنتهي بفاصلة منقوطة <code>;</code>.'
    },
    {
        type: 'mcq',
        question: '11. How do you access the members of a structure variable in C++?',
        options: [
            'structVariable->member',
            'structVariable.member',
            'structVariable::member',
            'structVariable#member'
        ],
        answer: 1,
        source: 'Questions lec.10 · Q2 · p. 1',
        explanation: '<strong>التحليل:</strong> يُستخدم عامل النقطة <code>.</code> مع متغير البنية مباشرة، أما <code>-&gt;</code> فيُستخدم مع مؤشر إلى بنية.'
    },
    {
        type: 'mcq',
        question: '12. What happens when a local structure variable is not initialized (and has no default member initializers) in C++?',
        options: [
            'The members get default zero values.',
            'The members contain garbage values.',
            'A runtime error occurs immediately at declaration.',
            'The compiler throws an error.'
        ],
        answer: 1,
        source: 'Questions lec.10 · Q4 · p. 1',
        explanation: '<strong>التحليل:</strong> مثل أي متغير محلي غير مهيأ في C++، تحتوي أعضاء البنية غير المهيأة على قيم عشوائية (Garbage values).'
    },
    {
        type: 'mcq',
        question: '13. What is the main advantage of using structures over individual variables?',
        options: [
            'Eliminates the need for data types',
            'Groups related data logically under one name',
            'Makes all variables global automatically',
            'Prevents using functions'
        ],
        answer: 1,
        source: 'Questions lec.10 · Q6 · p. 2',
        explanation: '<strong>التحليل:</strong> البنية تجمع البيانات المرتبطة منطقياً بكيان واحد (مثل شخص أو نقطة) تحت اسم واحد، مما يسهل تنظيم الكود وقراءته.'
    },
    {
        type: 'mcq',
        question: '14. What is the size of a structure in memory determined by?',
        options: [
            'Always the exact sum of the sizes of its members',
            'Only the largest member size',
            'Sum of member sizes plus any padding for alignment',
            'Always 64 bytes'
        ],
        answer: 2,
        source: 'Questions lec.10 · Q8 · p. 2',
        explanation: '<strong>التحليل:</strong> يضيف المترجم أحياناً حشواً (Padding) لمحاذاة الأعضاء في الذاكرة، لذا حجم البنية يساوي مجموع أحجام الأعضاء مضافاً إليه أي padding.'
    },
    {
        type: 'mcq',
        question: '15. How can you pass a large structure to a function efficiently without copying all its members?',
        options: [
            'By value',
            'By reference',
            'By a constant pointer',
            'Both b and c'
        ],
        answer: 3,
        source: 'Questions lec.10 · Q9 · p. 2',
        explanation: '<strong>التحليل:</strong> التمرير بالمرجع (<code>const Person &amp;p</code>) أو بالمؤشر (<code>const Person *p</code>) يتجنب نسخ جميع أعضاء البنية.'
    },
    {
        type: 'mcq',
        question: '16. How can you initialize all members of a structure variable at declaration?',
        options: [
            'Using the dot operator inside the struct definition',
            'Using an initializer list (e.g., Point p1 = {0, 1};)',
            'Using #define',
            'Using std::cout'
        ],
        answer: 1,
        source: 'Questions lec.10 · Q12 · p. 3',
        explanation: '<strong>التحليل:</strong> يمكن تهيئة أعضاء البنية دفعة واحدة عند التصريح عن المتغير باستخدام قائمة التهيئة <code>{0, 1}</code> بالترتيب.'
    },
    {
        type: 'mcq',
        question: '17. Which of the following is a valid declaration of an array of 100 Book structures?',
        options: [
            'struct Book library[100];',
            'Book struct library[100];',
            'struct library[100] Book;',
            'struct Book [100];'
        ],
        answer: 0,
        source: 'Questions lec.10 · Q13 · p. 3',
        explanation: '<strong>التحليل:</strong> يُصرح عن مصفوفة من البنيات كأي مصفوفة أخرى: <bdi dir="ltr">struct Book library[100];</bdi> أو <bdi dir="ltr">Book library[100];</bdi> في C++.'
    },
    {
        type: 'mcq',
        question: '18. What is a pointer to a structure?',
        options: [
            'A special operator inside structs',
            'A variable storing the memory address of a structure',
            'A built-in header file in C++',
            'A replacement for the struct keyword'
        ],
        answer: 1,
        source: 'Questions lec.10 · Q15 · p. 4',
        explanation: '<strong>التحليل:</strong> مؤشر البنية يخزن عنوان الذاكرة لمتغير من نوع البنية (مثل <code>Person *ptr = &amp;p1;</code>).'
    },
    {
        type: 'mcq',
        question: '19. What is the purpose of padding in structures?',
        options: [
            'Reduce memory usage to zero',
            'Align members to memory boundaries',
            'Encrypt structure members',
            'Delete unused members'
        ],
        answer: 1,
        source: 'Questions lec.10 · Q16 · p. 4',
        explanation: '<strong>التحليل:</strong> المحاذاة (Alignment) بالـ Padding تضمن وضع كل عضو على عنوان ذاكرة مناسب للمعالج للوصول السريع.'
    },
    {
        type: 'mcq',
        question: '20. How can you access structure members using a pointer ptr to a structure?',
        options: [
            'Using ptr.member',
            'Using the arrow operator (ptr->member)',
            'Using dereferencing and dot ((*ptr).member)',
            'Using both b and c'
        ],
        answer: 3,
        source: 'Questions lec.10 · Q17 · p. 4',
        explanation: '<strong>التحليل:</strong> كلا الطريقتين صحيحتان في C++: إما <bdi dir="ltr">ptr-&gt;member</bdi> أو <bdi dir="ltr">(*ptr).member</bdi> (الأقواس ضرورية لأن أولوية <code>.</code> أعلى من <code>*</code>).'
    },
    {
        type: 'mcq',
        question: '21. What does sizeof(structName) return in C++?',
        options: [
            'The size of the structure in bits',
            'The size of the structure in bytes, including padding',
            'The size of the first member only',
            'The number of members in the structure'
        ],
        answer: 1,
        source: 'Questions lec.10 · Q19 · p. 5',
        explanation: '<strong>التحليل:</strong> <code>sizeof</code> يعيد إجمالي حجم البنية بالبايت متضمناً أي حشو محاذاة (Padding).'
    },
    {
        type: 'mcq',
        question: '22. What happens if you assign one structure variable to another of the same type (e.g., p2 = p1;)?',
        options: [
            'Only memory addresses are copied',
            'Only the first member is copied',
            'All member values are copied',
            'A compilation error always occurs'
        ],
        answer: 2,
        source: 'Questions lec.10 · Q20 · p. 5',
        explanation: '<strong>التحليل:</strong> الإسناد بين متغيرين من نفس الـ <code>struct</code> ينسخ قيم جميع الأعضاء عضوياً (Member-wise copy) تلقائياً.'
    },
    {
        type: 'mcq',
        question: '23. How do you declare a constant structure variable?',
        options: [
            'structName const varName;',
            'const structName varName;',
            'struct const structName varName;',
            'constant structName varName;'
        ],
        answer: 1,
        source: 'Questions lec.10 · Q21 · p. 5',
        explanation: '<strong>التحليل:</strong> تُكتب <code>const</code> قبل اسم نوع البنية: <bdi dir="ltr">const Point p1 = {0, 1};</bdi> لمنع تعديل أعضائها بعد التهيئة.'
    },
    {
        type: 'mcq',
        question: '24. What is the most common use case for structures in introductory C++?',
        options: [
            'Representing simple grouped data records',
            'Replacing all loops',
            'Replacing #include directives',
            'Writing operating system bootloaders only'
        ],
        answer: 0,
        source: 'Questions lec.10 · Q24 · p. 6',
        explanation: '<strong>التحليل:</strong> البنيات مثالية لتمثيل سجلات البيانات المترابطة (Records) مثل بيانات طالب أو موظف أو نقطة هندسية.'
    },
    {
        type: 'mcq',
        question: '25. How do structures differ from unions in memory usage?',
        options: [
            'Structures allocate memory for all members; unions allocate memory for the largest member only.',
            'Structures share one memory space for all members.',
            'Unions allocate separate memory for every member.',
            'Unions cannot hold different data types.'
        ],
        answer: 0,
        source: 'Questions lec.10 · Q25 · p. 6',
        explanation: '<strong>التحليل:</strong> في الـ <code>struct</code> يحصل كل عضو على مساحة مستقلة في الذاكرة، أما في الـ <code>union</code> فيتشارك جميع الأعضاء نفس موقع الذاكرة بحجم أكبر عضو.'
    },

    // 10 Essay: Error Correction, Code Writing, Concept & Tracing
    {
        type: 'essay',
        question: '26. Identify and correct the syntax error in this structure definition.',
        code: 'struct Part\n{\n    int partNumber;\n    char partName[ 26 ];\n}',
        source: 'Final Exam · Fall 2024–2025 · Q3.4 · p. 3',
        explanation: '<strong>الإجابة النموذجية:</strong> تنقص فاصلة منقوطة <code>;</code> بعد قوس الإغلاق <code>}</code> في نهاية تعريف الـ <code>struct</code>.',
        solutionCode: 'struct Part\n{\n    int partNumber;\n    char partName[ 26 ];\n};'
    },
    {
        type: 'essay',
        question: '27. Write a C++ structure named Car to store brand (string), model (string), year (int), and price (float), and declare a variable myCar initialized with {"Toyota", "Corolla", 2020, 20000.0}.',
        source: 'Summary lec.10 · Programming Q1 · p. 5',
        explanation: '<strong>الإجابة النموذجية:</strong> نعرّف البنية بالأعضاء المطلوبة بالترتيب ثم نهيّئ المتغير <code>myCar</code> بقائمة التهيئة.',
        solutionCode: 'struct Car {\n    string brand;\n    string model;\n    int year;\n    float price;\n};\n\nCar myCar = {"Toyota", "Corolla", 2020, 20000.0};'
    },
    {
        type: 'essay',
        question: '28. Write a C++ structure named Student that contains a string name and an integer array marks of size 5.',
        source: 'Summary lec.10 · Q&A 10 · p. 3–4',
        explanation: '<strong>الإجابة النموذجية:</strong> يمكن أن يكون أحد أعضاء البنية مصفوفة كالتالي:',
        solutionCode: 'struct Student {\n    string name;\n    int marks[5];\n};'
    },
    {
        type: 'essay',
        question: '29. Write a C++ structure named Book (with string title, string author, float price) and declare an array named library capable of storing 100 books.',
        source: 'Summary lec.10 · Programming Q3 · p. 6',
        explanation: '<strong>الإجابة النموذجية:</strong> بعد تعريف <code>struct Book</code> نعرّف مصفوفة من هذا النوع بحجم <code>100</code>.',
        solutionCode: 'struct Book {\n    string title;\n    string author;\n    float price;\n};\n\nBook library[100];'
    },
    {
        type: 'essay',
        question: '30. Given struct Person { int age; }; and Person p1;, write C++ statements to declare a pointer ptr pointing to p1 and assign 25 to its age member using the arrow operator.',
        source: 'Summary lec.10 · Programming Q9 · p. 7',
        explanation: '<strong>الإجابة النموذجية:</strong> نأخذ عنوان <code>p1</code> بـ <code>&amp;p1</code> ثم نستخدم <code>ptr-&gt;age = 25;</code>.',
        solutionCode: 'Person *ptr = &p1;\nptr->age = 25;'
    },
    {
        type: 'essay',
        question: '31. Explain the main difference between an Array and a Structure (struct) in C++.',
        source: 'Summary lec.10 · Q&A 2 · p. 2 (also Structures Slides · p. 2)',
        explanation: '<strong>الإجابة النموذجية:</strong> المصفوفة (<strong>Array</strong>) تخزن مجموعة عناصر من <strong>نفس نوع البيانات</strong> في مواقع متجاورة ويتم الوصول إليها بالفهرس الرقمي؛ أما البنية (<strong>Structure</strong>) فهي نوع بيانات يعرّفه المستخدم لتجميع متغيرات قد تكون من <strong>أنواع مختلفة</strong> تحت اسم واحد ويتم الوصول لأعضائها بالاسم عبر عامل النقطة <code>.</code>.'
    },
    {
        type: 'essay',
        question: '32. Trace the output of the following C++ program (preserve line breaks).',
        code: 'struct Point\n{\n    int x, y;\n};\n\nint main()\n{\n    Point p1, p2;\n    p1.x = 5;    p2.x = 10;\n    p1.y = 15;   p2.y = 20;\n    cout << p1.x << " " << p1.y << endl;\n    cout << p2.x << " " << p2.y;\n    return 0;\n}',
        source: 'Structures Slides (Summer 2026) · p. 11',
        adaptation: 'Used int main() with return 0; for standard C++ conformance.',
        expectedOutput: '5 15\n10 20',
        explanation: '<strong>التحليل:</strong> كل متغير بنية له نسخته المستقلة من <code>x</code> و<code>y</code>، فيطبع <code>p1</code> السطر <code>5 15</code> ثم يطبع <code>p2</code> السطر <code>10 20</code>.'
    },
    {
        type: 'essay',
        question: '33. Trace the output when structure variables are declared directly with the struct definition.',
        code: 'struct Point\n{\n    int x, y;\n} p1, p2;\n\nint main()\n{\n    p1.x = 5;    p2.x = 10;\n    p1.y = 15;   p2.y = 20;\n    cout << p1.x << " " << p1.y << endl;\n    cout << p2.x << " " << p2.y;\n    return 0;\n}',
        source: 'Structures Slides (Summer 2026) · p. 12',
        adaptation: 'Used int main() with return 0;.',
        expectedOutput: '5 15\n10 20',
        explanation: '<strong>التحليل:</strong> التصريح عن <code>p1, p2</code> مباشرة بعد <code>}</code> يعرّف متغيرين عامين من نوع <code>Point</code>، والنتيجة مطابقة للمثال السابق: <code>5 15</code> ثم <code>10 20</code>.'
    },
    {
        type: 'essay',
        question: '34. Trace the output of the following C++ program with default member initializers (preserve line breaks).',
        code: 'struct Point {\n    int x = 0;\n    int y = 1;\n};\n\nint main() {\n    struct Point p1;\n    cout << "x = " << p1.x << ", y = " << p1.y << endl;\n    p1.y = 20;\n    cout << "x = " << p1.x << ", y = " << p1.y;\n    return 0;\n}',
        source: 'Structures Slides (Summer 2026) · p. 13',
        adaptation: 'Used int main() with return 0;.',
        expectedOutput: 'x = 0, y = 1\nx = 0, y = 20',
        explanation: '<strong>التحليل:</strong> يبدأ <code>p1</code> بالقيم الافتراضية <code>x = 0</code> و<code>y = 1</code> فيطبع السطر الأول، ثم يُعدَّل <code>p1.y = 20</code> فيطبع <code>x = 0, y = 20</code>.'
    },
    {
        type: 'essay',
        question: '35. Trace the output of the following C++ program using an initializer list (preserve line breaks).',
        code: 'struct Point {\n    int x, y;\n};\n\nint main() {\n    struct Point p1 = { 0, 1 };\n    cout << "x = " << p1.x << ", y = " << p1.y << endl;\n    p1.x = 20;\n    cout << "x = " << p1.x << ", y = " << p1.y;\n    return 0;\n}',
        source: 'Structures Slides (Summer 2026) · p. 14',
        expectedOutput: 'x = 0, y = 1\nx = 20, y = 1',
        explanation: '<strong>التحليل:</strong> تتهيأ <code>p1.x = 0</code> و<code>p1.y = 1</code> بالترتيب، ثم يتغير <code>p1.x</code> إلى <code>20</code> وتبقى <code>p1.y = 1</code>.'
    }
];
