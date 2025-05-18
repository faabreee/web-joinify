import type { FormHTMLAttributes } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { FormProvider as Form } from 'react-hook-form';

type Props = FormHTMLAttributes<HTMLFormElement> & {
    children: React.ReactNode;
    methods: UseFormReturn<any>;
    onSubmit?: VoidFunction;
};

export default function FormProvider({ children, onSubmit, methods, ...others }: Props) {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit} {...others}>{children}</form>
        </Form>
    );
}