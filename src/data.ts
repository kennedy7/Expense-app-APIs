const data: Data = {
    report: []
}

interface Data{
    report: {
        id: string;
        source: string;
        amount: number;
        createdAt: Date;
        updateddAt: Date;
        type: "income" | "expense"

    }[]
}
data.report.push({
    id: "uuid",
    source: "Salary",
    amount: 150000,
    createdAt: new Date(),
    updateddAt: new Date(),
    type: "expense"

})