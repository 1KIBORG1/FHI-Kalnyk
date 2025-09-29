/* 1. úloha
BMI index - funkcia, ktorá má vstupné parametre hmotnosť v kg a výšku v cm a vráti, či má daná osoba podváhu (BMI<=19),
normálnu hmotnosť (19<BMI<=25), nadváhu (25<BMI<=30) alebo obezitu a koľko kg musí schudnúť/pribrať, aby mal normálnu hmotnosť.

Ako vypočítať BMI?
Vypočíta sa vydelením hmotnosti daného človeka druhou mocninou jeho výšky.
BMI = m / h²
m = telesná hmotnosť v kilogramoch
h = telesná výška v metroch
*/

function calculateBMI(weightKg: number, heightCm: number) {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    let category = '';
    let kgToLose = 0;
    let kgToGain = 0;

    if (bmi <= 19) {
        category = 'podváha';
        kgToGain = +(19 * (heightM * heightM) - weightKg).toFixed(1);
        kgToLose = 0;
    } else if (bmi <= 25) {
        category = 'normálna hmotnosť';
        kgToLose = 0;
        kgToGain = 0;
    } else if (bmi <= 30) {
        category = 'nadváha';
        kgToLose = +(weightKg - 25 * (heightM * heightM)).toFixed(1);
        kgToGain = 0;
    } else {
        category = 'obezita';
        kgToLose = +(weightKg - 25 * (heightM * heightM)).toFixed(1);
        kgToGain = 0;
    }

    return {
        BMI: bmi,
        kategoria: category,
        kg_na_schudnutie: kgToLose,
        kg_na_pribratie: kgToGain
    };
}

/* 2. úloha
Napíšte funkciu, ktorá dostane vetu (max. 255 znakov), spočíta počet výskytov jednotlivých písmen vo vete (nerozlišuje veľké a malé písmená)
a vypíše prehľadnú tabuľku.

Napr.:
pre slovo Alabama:
a 4
l 1
b 1
m 1
*/

function calculateLetters(text: string) {
    let textLC = text.toLowerCase();
    let letterCounts: { [key: string]: number } = {};

    for (const ch of textLC) {
        if (ch < 'a' || ch > 'z') {
            continue;
        }
        letterCounts[ch] = (letterCounts[ch] || 0) + 1;
    }

    for (const key in letterCounts) {
        console.log(key, letterCounts[key]);
    }
}

/* 3. úloha
V slovnej zásobe slovenského jazyka existujú slová, resp. slovné spojenia, ktoré sa čítajú rovnako sprava i zľava,
napr. abba, madam, radar, kobyla ma maly bok, jelenovi pivo nelej... Nazývame ich palindromy.
Napíšte funkciu, ktorá pre vstupný reťazec overí, či ide o takéto slovo/vetu.
Program v slove/vo vete nerozlišuje malé a veľké písmená a ignoruje medzery.
*/

function isPalindrome(text: string): boolean {
    text = text.toLowerCase().trim()
    let textReversed = text.split("").reverse().join("")
    return text === textReversed;
}

/* 4. úloha
Na vstupe sú celé čísla a, n. Napíšte funkciu na výpočet n-tej mocniny čísla a.

Napr.:
vstup: -2 5
výstup: (-2)^5 = -32
*/

function power(a: number, n: number) {
    return Math.pow(a, n)
}

/* 5. úloha
Fibonacciho postupnosť nazývaná aj zlatá cesta (z gréc. χρνσοδρομος, chrysodromos),
nazval francúzsky matematik Édouard Lucas (1842-1891) podľa stredovekého talianskeho matematika Leonarda z Pisy, prezývaného Fibonacci.
Táto postupnosť vznikne tak, že prvé dve čísla sú dané (0, 1) a každé nasledujúce je súčtom dvoch predchádzajúcich.
Napíšte funkciu, ktorá vypíše zadaný počet Fibonacciho čísel.

Napr.:
vstup: 11
výstup: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
*/

function fibonacciho(a: number) {
    let numbers: number[] = [0, 1]
    for (let i = 0; i < a - 2; i++) {
        numbers[i + 2] = numbers[i]! + numbers[i + 1]!
    }
    return numbers
}

/* 6. úloha
Funkcia vypočíta n! = n. (n-1).(n-2)...1 po zadaní prirodzeného čísla n na vstupe (ošetrite vstup, aby n > 0).

Napr.:
vstup: 5
výstup: 5! = 5.4.3.2.1 = 120
Napr.:
vstup: 0
výstup: Zadaj celé číslo > 0
*/

function factorial(a: number) {
    if (a < 0 || !Number.isInteger(a)) {
        return "Zadaj celé číslo > 0"
    }
    if (a == 1 || a == 0) {
        return 1
    } else {
        for (let i = 0; i < a; i++) {
            return a * factorial(a - 1)
        }
    }
}

/*
7. úloha
Napíšte funkciu na výpočet sumy (na 2 des. miesta), ktorú zaplatíte taxikárovi keď:

v meste (vzdialenosť do 5 km) je suma fixná - 1,50 €,
za každý kilometer navyše 0,75 €/km (viac ako 5 km),
čakanie 10 €/h
znečistenie interiéru 20 €.
Napr.:
vstup:
počet km: 15
čakanie v min.: 5
znečistenie (a/n): n
výstup: 9,83 € (1,50 + 10.0,75 + 5.10/60)
*/

function calculateSum(km: number, waiting: number, pollution: string): number {
    let sum = 0
    if (km <= 5) {
        sum += 1.5
    } else {
        sum += (km - 5) * 0.75 + 1.5
    }
    if (waiting > 0) {
        sum += waiting * 10 / 60
    }
    if (pollution.toLowerCase() == "a" || pollution.toLowerCase() == 'y') {
        sum += 20
    }
    return parseFloat(sum.toFixed(2))
}

/* 8. úloha
Napíšte funkciu na zašifrovanie zadanej vety pomocou šifry BALTIMORESKY

(B=1, A=2, L=3, T=4, I=5, M=6, O=7, R=8, E=9, S=10, K=11, Y=12)
Napr,:
vstup: To nemyslite vážne!
výstup: 47 N9612103549 V2ZN9!
*/

function baltimoresky(text:string): string {
    let result = "";
    for (let ch of text) {
        let up = ch.toUpperCase();

        if (up == "B") result += "1";
        else if (up == "A") result += "2";
        else if (up == "L") result += "3";
        else if (up == "T") result += "4";
        else if (up == "I") result += "5";
        else if (up == "M") result += "6";
        else if (up == "O") result += "7";
        else if (up == "R") result += "8";
        else if (up == "E") result += "9";
        else if (up == "S") result += "10";
        else if (up == "K") result += "11";
        else if (up == "Y") result += "12";
        else result += ch;
    }
    return result;
}


// MAIN CODE

//TASK №1
console.log("TASK №1")
const result = calculateBMI(62, 162);
console.log(result);
console.log()

//TASK №2
console.log("TASK №2")
calculateLetters("Alabama");
console.log()

//TASK №3
console.log("TASK №3")
console.log(isPalindrome("hello"))
console.log(isPalindrome("RaDar"))
console.log()

//TASK №4
console.log("TASK №4")
console.log(power(2, 5))
console.log()

//TASK №5
console.log("TASK №5")
console.log(fibonacciho(11).join(", "))
console.log()

//TASK №6
console.log("TASK №6")
console.log(factorial(-5))
console.log()

//TASK №7
console.log("TASK №7")
console.log(calculateSum(15,5,"n"))
console.log()

//TASK №8
console.log("TASK №8")
console.log(baltimoresky("To nemyslite vážne!"))
