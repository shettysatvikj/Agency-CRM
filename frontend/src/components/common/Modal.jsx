import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Modal = ({ open, onClose, title, children }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <Transition.Child
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              as={Fragment}
            >
              <Dialog.Panel
                className="
                  w-full
                  max-w-md sm:max-w-lg md:max-w-xl
                  rounded-2xl
                  bg-white
                  p-4 sm:p-6 md:p-8
                  shadow-xl
                  max-h-[90vh]
                  overflow-y-auto
                "
              >
                {/* Title */}
                <Dialog.Title className="text-base sm:text-lg md:text-xl font-semibold mb-4">
                  {title}
                </Dialog.Title>

                {/* Content */}
                <div className="text-sm sm:text-base">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;