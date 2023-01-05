import React from 'react'
import {TaskFilterType, TasksFilterModelType} from './tasksFilterModel'
import {useEvent, useStore} from 'effector-react'
import {Radio, RadioChangeEvent} from 'antd'

export const TasksFilter: React.FC<{model: TasksFilterModelType}> = ({
    model,
}) => {
    const filter = useStore(model.$filter)
    const setFilter = useEvent(model.setFilter)

    const handleFilterChange = (e: RadioChangeEvent) =>
        setFilter(e.target.value)

    return (
        <Radio.Group
            size={'small'}
            value={filter}
            onChange={handleFilterChange}
        >
            <Radio.Button value={TaskFilterType.All}>All</Radio.Button>
            <Radio.Button value={TaskFilterType.Completed}>
                Completed
            </Radio.Button>
            <Radio.Button value={TaskFilterType.Uncompleted}>
                Uncompleted
            </Radio.Button>
        </Radio.Group>
    )
}
