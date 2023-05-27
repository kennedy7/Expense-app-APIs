export enum ReportType{
    INCOME= 'income',
    EXPENSE = 'expense'
}

export const data: Data = {
    report: [{
        id: "uuid",
        source: "Salary",
        amount: 150000,
        createdAt: new Date(),
        updateddAt: new Date(),
        type: ReportType.INCOME
    }, {
        id: "uuid",
        source: "maintenance",
        amount: 30000,
        createdAt: new Date(),
        updateddAt: new Date(),
        type: ReportType.EXPENSE
    }
]
}

interface Data{
    report: {
        id: string;
        source: string;
        amount: number;
        createdAt: Date;
        updateddAt: Date;
        type: ReportType

    }[]
}



// data.report.push({
//     id: "uuid",
//     source: "Salary",
//     amount: 150000,
//     createdAt: new Date(),
//     updateddAt: new Date(),
//     type: ReportType.EXPENSE

// })