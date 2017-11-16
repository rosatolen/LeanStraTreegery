import treeConverter from '../treeConverter';

it('should print out a tree node', () => {
    let output = treeConverter.toString({
        name: "bob",
        KPI: [],
        children: []
    });

    expect(output).toBe("bob");
});

it('should print out tree node with KPIs', () => {
    let output = treeConverter.toString({
        name: "Bob's Happiness",
        KPI: ["moneyInPocket", "carInGarage"],
        children: []
    });

    expect(output).toBe("Bob's Happiness: moneyInPocket, carInGarage");
});

it('should print out child nodes', () => {
    let output = treeConverter.toString({
        name: "Bob's Happiness",
        KPI: ["moneyInPocket", "carInGarage"],
        children: [{
                name: "Job",
                KPI: ["salary"],
                children: [
                    {
                        name: "Promotion",
                        KPI: ["Direct Reports", "Division"],
                        children: []
                    }
                ]
            },
            {
                name: "Project Car",
                KPI: ["0-60", "Horsepower"],
                children: []
            }
        ]
    });

    expect(output).toBe("Bob's Happiness: moneyInPocket, carInGarage\n\tJob: salary\n\t\tPromotion: Direct Reports, Division\n\tProject Car: 0-60, Horsepower");
});