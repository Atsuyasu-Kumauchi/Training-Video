"use client";
import { cn } from "@/tmsui/utility";
import { RefObject, useImperativeHandle, useState } from "react";

// type of ui basic modal use ref for declaration
export type TUiHeadLessModalRef = {
    modalOpen: () => void;
    modalClose: () => void;
    modalToggle: () => void;
};

// type of ui basic modal use ref for declaration
export const uiHeadLessModalRefDefaultValue = () => ({
    modalOpen: () => alert('"modalOpen" Method not found.'),
    modalClose: () => alert('"modalClose" Method not found.'),
    modalToggle: () => alert('"modalToggle" Method not found.'),
});

// type of ui basic modal use ref for as a prop
export type TUiHeadLessModalRefType = RefObject<TUiHeadLessModalRef>;

//
export type TUiHeadLessModalRefPropsType = {
    modalRef: TUiHeadLessModalRefType;
};

type TUiHeadLessModalProps = {
    modalRef: TUiHeadLessModalRefType;
    title?: string;
    description?: string;
    showCloseButton?: boolean;
    body?: React.ReactNode;
}

export function UiHeadLessModal({ modalRef, title, description, showCloseButton = true, body }: TUiHeadLessModalProps) {
    const [isOpen, setIsOpen] = useState(false);


    const modalOpen = () => {
        setIsOpen(true);
    };
    const modalClose = () => {
        setIsOpen(false);
    };

    const modalToggle = () => {
        setIsOpen((prevState) => !prevState);
    };

    useImperativeHandle(modalRef, () => ({
        modalOpen,
        modalClose,
        modalToggle,
    }));

    return (
        <div className={cn(isOpen ? "block" : "hidden")}>
            {body}
        </div>
    )
}