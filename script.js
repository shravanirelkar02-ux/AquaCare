const setupScreen =
    document.getElementById("setupScreen");

const dashboardScreen =
    document.getElementById("dashboardScreen");

const continueBtn =
    document.getElementById("continueBtn");

const addPersonBtn =
    document.getElementById("addPersonBtn");

const membersInput =
    document.getElementById("membersInput");

const peopleContainer =
    document.getElementById("peopleContainer");

const overallText =
    document.getElementById("overallText");

const overallProgress =
    document.getElementById("overallProgress");

const percentage =
    document.getElementById("percentage");

const remaining =
    document.getElementById("remaining");

const message =
    document.getElementById("message");

const resetBtn =
    document.getElementById("resetBtn");

const dropAnimation =
    document.getElementById("dropAnimation");

const celebration =
    document.getElementById("celebration");

const celebrationText =
    document.getElementById("celebrationText");


let people = [];

let glassSize = 250;

let goalType = "glasses";

let goalAmount = 8;

addPersonBtn.addEventListener(
    "click",
    function () {

        const personWrapper =
            document.createElement("div");

        personWrapper.className =
            "memberRow";


        const input =
            document.createElement("input");

        input.type =
            "text";

        input.className =
            "memberInput";

        input.placeholder =
            "Person name";


        const deleteBtn =
            document.createElement("button");

        deleteBtn.type =
            "button";

        deleteBtn.textContent =
            "Delete";

        deleteBtn.className =
            "deletePersonBtn";


        deleteBtn.addEventListener(
            "click",
            function () {

                personWrapper.remove();

            }
        );


        personWrapper.appendChild(
            input
        );

        personWrapper.appendChild(
            deleteBtn
        );


        membersInput.appendChild(
            personWrapper
        );

    }
);

continueBtn.addEventListener(
    "click",
    function () {

        const selectedGoal =
            document.querySelector(
                'input[name="goal"]:checked'
            );

        const selectedGlass =
            document.querySelector(
                'input[name="glass"]:checked'
            );


        if (!selectedGoal || !selectedGlass) {

            alert(
                "Please select your water goal and glass size."
            );

            return;

        }


        goalType =
            selectedGoal.value;


        glassSize =
            Number(
                selectedGlass.value
            );


        if (goalType === "glasses") {

            goalAmount = 8;

        } else {

            goalAmount =
                Math.ceil(
                    3000 / glassSize
                );

        }


        const inputs =
            document.querySelectorAll(
                ".memberInput"
            );


        people = [];


        inputs.forEach(
            function (input) {

                const name =
                    input.value.trim();


                if (name !== "") {

                    people.push({

                        name: name,

                        glasses: 0

                    });

                }

            }
        );


        if (people.length === 0) {

            alert(
                "Please add at least one family member."
            );

            return;

        }


        setupScreen.classList.add(
            "hidden"
        );


        dashboardScreen.classList.remove(
            "hidden"
        );


        renderDashboard();

    }
);

function renderDashboard() {

    peopleContainer.innerHTML = "";


    people.forEach(
        function (person, index) {

            const card =
                document.createElement("div");


            card.className =
                "personCard";


            const personPercentage =
                Math.min(
                    100,
                    (
                        person.glasses /
                        goalAmount
                    ) * 100
                );


            card.innerHTML = `

                <div class="personTop">

                    <div class="personName">
                        💧 ${person.name}
                    </div>

                    <div class="personCount">
                        ${person.glasses} / ${goalAmount}
                    </div>

                </div>


                <div class="personProgress">

                    <div
                        class="personProgressFill"
                        style="width: ${personPercentage}%"
                    ></div>

                </div>


                <div class="personButtons">

                    <button
                        class="drinkBtn"
                        onclick="drinkWater(${index})"
                    >
                        + Drink
                    </button>


                    <button
                        class="undoBtn"
                        onclick="undoDrink(${index})"
                    >
                        Undo
                    </button>

                </div>

            `;


            peopleContainer.appendChild(
                card
            );

        }
    );


    updateOverallProgress();

}

function drinkWater(index) {

    const person =
        people[index];


    if (
        person.glasses >=
        goalAmount
    ) {

        message.textContent =
            `${person.name} has already completed today's goal.`;

        return;

    }


    person.glasses++;


    showWaterDrop();


    message.textContent =
        `${person.name} drank a glass of water 💧`;


    message.className =
        "message";


    renderDashboard();


    if (
        person.glasses ===
        goalAmount
    ) {

        message.textContent =
            `🎉 ${person.name} completed today's goal!`;


        message.className =
            "message success";


        showCelebration(
            person.name
        );

    }

}

function undoDrink(index) {

    const person =
        people[index];


    if (
        person.glasses > 0
    ) {

        person.glasses--;


        message.textContent =
            `Last drink removed for ${person.name}.`;


        message.className =
            "message";


        renderDashboard();

    }

}

function updateOverallProgress() {

    let totalGlasses = 0;


    people.forEach(
        function (person) {

            totalGlasses +=
                person.glasses;

        }
    );


    const familyGoal =
        goalAmount *
        people.length;


    let progress =
        (
            totalGlasses /
            familyGoal
        ) * 100;


    progress =
        Math.min(
            progress,
            100
        );


    overallText.textContent =
        `${totalGlasses} / ${familyGoal} glasses`;


    overallProgress.style.width =
        `${progress}%`;


    percentage.textContent =
        `${Math.round(progress)}%`;


    const totalWater =
        totalGlasses *
        glassSize;


    const totalTarget =
        familyGoal *
        glassSize;


    const waterRemaining =
        Math.max(
            0,
            totalTarget -
            totalWater
        );


    remaining.textContent =
        `${waterRemaining} ml remaining`;

}

function showWaterDrop() {

    dropAnimation.textContent =
        "💧";


    dropAnimation.classList.remove(
        "dropAnimationActive"
    );


    void dropAnimation.offsetWidth;


    dropAnimation.classList.add(
        "dropAnimationActive"
    );

}

function showCelebration(name) {

    celebrationText.textContent =
        `${name} completed today's water goal! 💧`;


    celebration.classList.remove(
        "hidden"
    );

}


function closeCelebration() {

    celebration.classList.add(
        "hidden"
    );

}

resetBtn.addEventListener(
    "click",
    function () {

        const confirmReset =
            confirm(
                "Reset today's water tracking?"
            );


        if (!confirmReset) {

            return;

        }


        people.forEach(
            function (person) {

                person.glasses = 0;

            }
        );


        message.textContent =
            "Today's tracker has been reset 💧";


        message.className =
            "message";


        renderDashboard();

    }
);