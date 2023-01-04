import {createApi, createDomain} from 'effector'

export const createSubmitFormModel = (name: string) => {
    const domain = createDomain(name)
    const $title = domain.createStore('')

    const {submit, change, reset} = createApi($title, {
        change: (_, title: string) => title,
        submit: (state) => state,
        reset: () => '',
    })

    return {$title, change, submit, reset}
}
