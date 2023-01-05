import React, {FC} from 'react'
import {useStore} from 'effector-react'
import {SubmitInput} from 'common/components/SubmitInput'
import {SubmitFormModelType} from 'common/models/submitFormModel'

export const SubmitItemForm: FC<{model: SubmitFormModelType}> = ({model}) => {
    const title = useStore(model.$title)
    const handleSubmit = () => model.submit()
    const handleChange = (value: string) => model.change(value)

    return (
        <SubmitInput
            value={title}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    )
}
