export interface TasksModel {
    id: string
    name: string
    desc: string
    status: TaskStatus
}

export enum TaskStatus {
    open = "OPEN",
    closed = "CLOSED"
}