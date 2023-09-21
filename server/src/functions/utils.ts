// for showing error messages
export const show_bad_message = (cause: string) => {
    return {
        'msg':'bad',
        'cause':cause
    }
}

export const show_good_message = (cause?: string) => {
    return {
        'msg':'bad',
        'cause':cause || 'everything is okay'
    }
}