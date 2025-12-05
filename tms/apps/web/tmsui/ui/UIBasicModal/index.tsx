import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, RefObject, useEffect, useState } from "react";

// type of ui basic modal use ref for declaration
export type TUiBasicModalRef = {
    modalOpen: () => void;
    modalClose: () => void;
    modalToggle: () => void;
};

// type of ui basic modal use ref for declaration
export const uiBasicModalRefDefaultValue = () => ({
    modalOpen: () => alert('"modalOpen" Method not found.'),
    modalClose: () => alert('"modalClose" Method not found.'),
    modalToggle: () => alert('"modalToggle" Method not found.'),
});

// type of ui basic modal use ref for as a prop
export type TUiBasicModalRefType = RefObject<TUiBasicModalRef>;

//
export type TUiBasicModalRefPropsType = {
    modalRef: TUiBasicModalRefType;
};

type TUiBasicModalProps = {
    modalRef: TUiBasicModalRefType;
    title?: string;
    description?: string;
    showCloseButton?: boolean;
    body?: React.ReactNode;
}

export function UiBasicModal({ modalRef, title, description, showCloseButton = true, body }: TUiBasicModalProps) {
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

    useEffect(() => {
        modalRef.current = {
            modalOpen,
            modalClose,
            modalToggle,
        };
    }, [modalRef]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={modalClose}>
                {/* Backdrop Overlay */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 bg-opacity-50 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-x-hidden overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-11/12 md:w-3/4 lg:w-1/2 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                {/* Header */}
                                {(title || showCloseButton) && (
                                    <div className="flex items-center justify-between  border-gray-200 pb-4">
                                        {title && (
                                            <DialogTitle
                                                as="h3"
                                                className="text-lg font-semibold leading-6 text-gray-900"
                                            >
                                                {title}
                                            </DialogTitle>
                                        )}

                                        {showCloseButton && (
                                            <button
                                                type="button"
                                                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                                                onClick={modalClose}
                                            >
                                                <span className="sr-only">Close</span>
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Description */}
                                {description && (
                                    <Description className="mt-2 text-sm text-gray-500">
                                        {description}
                                    </Description>
                                )}

                                {/* Content */}
                                <div className="mt-4">
                                    {body}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}