import { Task } from '@prisma/client';
import { Dispatch, FC, SetStateAction, useState } from 'react';

import {
  useCreateTaskData,
  useDeleteTaskData,
  useUpdateTaskData,
} from '../../hooks/useTaskData';
import { Button } from '../index';

interface TaskModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  modalItemData?: Task;
  setModalItemData: Dispatch<SetStateAction<Task | undefined>>;
}

export const Modal: FC<TaskModalProps> = ({
  setModalOpen,
  modalItemData,
  setModalItemData,
}) => {
  const [inputTitle, setInputTitle] = useState<string>(
    modalItemData ? modalItemData.title : ''
  );
  const [inputDescription, setInputDescription] = useState<string>(
    modalItemData ? modalItemData.description : ''
  );
  const [inputStatus, setInputStatus] = useState<string>(
    modalItemData ? modalItemData.status : 'to_do'
  );

  const createItem = useCreateTaskData();
  const editItem = useUpdateTaskData();
  const deleteItem = useDeleteTaskData();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="w-1/2 min-w-min space-y-4 p-8 bg-white rounded-md">
        <h1 className="text-3xl font-bold mr-2 w-72">
          {modalItemData?.id ? 'Edit task' : 'Create task'}
        </h1>
        <div>
          <label htmlFor="title" className="text-xl font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            className="w-full mt-2 p-1.5 border-2 border-gray-100 rounded-md bg-gray-100 shadow-sm focus:border-gray-300 active:border-gray-300 hover:border-gray-300 "
          ></input>
        </div>
        <div>
          <label htmlFor="description" className="text-xl font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
            className="w-full mt-2 p-0.5 border-2 border-gray-100 rounded-md bg-gray-100 shadow-sm focus:border-gray-300 active:border-gray-300 hover:border-gray-300 "
          ></textarea>
          <label htmlFor="status" className="text-xl font-medium">
            Status
          </label>
          <select
            id="status"
            className="w-full mt-2 p-1.5 border-2 border-gray-100 rounded-md bg-gray-100 shadow-sm focus:border-gray-300 active:border-gray-300 hover:border-gray-300 "
            onChange={(e) => setInputStatus(e.target.value)}
            value={inputStatus}
          >
            <option value="to_do">To do</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        {modalItemData?.id && (
          <div>
            <Button
              variant="link"
              onClick={() => {
                deleteItem(modalItemData?.id);
                setModalOpen(false);
                setModalItemData(undefined);
              }}
            >
              Delete this task
            </Button>
          </div>
        )}
        <div className="flex justify-end">
          <Button
            variant="secondary"
            onClick={() => {
              setModalItemData(undefined);
              setModalOpen(false);
              setModalItemData(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              {
                modalItemData?.id
                  ? editItem({
                      id: modalItemData?.id,
                      title: inputTitle,
                      description: inputDescription,
                      status: inputStatus,
                    })
                  : createItem({
                      title: inputTitle,
                      description: inputDescription,
                      status: inputStatus,
                    });
              }
              setModalOpen(false);
              setModalItemData(undefined);
            }}
          >
            {modalItemData?.id ? 'Save' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};
