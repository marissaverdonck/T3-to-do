import { Task } from '@prisma/client';
import type { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';

import { trpc } from '@utils';

import { Button, Column, Modal } from '../components';
import { COLUMN_STATUSES, COLUMN_LABELS } from '../utils/constants';

const Home: NextPage = () => {
  const utils = trpc.useContext();
  const { data: session } = trpc.auth.getSession.useQuery();
  const { data: taskData } = trpc.task.all.useQuery();
  const { mutate: createTask } = trpc.task.create.useMutation({
    onSuccess: () => {
      utils.task.all.invalidate();
    },
  });
  const { mutate: updateTask } = trpc.task.update.useMutation({
    onSuccess: () => {
      utils.task.all.invalidate();
    },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItemData, setModalItemData] = useState<Task | undefined>(
    undefined
  );

  return (
    <>
      <Head>
        <title>T3 Task Board</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white p-8 w-full h-screen">
        <header>
          <div className="flex flex-col items-end">
            <Button
              variant="lightGrey"
              onClick={session ? () => signOut() : () => signIn()}
            >
              {session ? 'Sign out' : 'Sign in'}
            </Button>
          </div>
        </header>
        {session?.user && (
          <main>
            <section className="max-auto">
              <section className="flex">
                <h1 className="text-3xl font-bold mr-2">Create task </h1>
                <Button variant="round" onClick={() => setModalOpen(true)}>
                  +
                </Button>
              </section>
              <section>
                <div className="flex w-full mt-6">
                  <>
                    {Object.values(COLUMN_STATUSES).map((key, index) => {
                      return (
                        <Column
                          key={index}
                          name={COLUMN_LABELS[key]}
                          status={key}
                          items={taskData}
                          setModalOpen={setModalOpen}
                          setModalItemData={setModalItemData}
                        />
                      );
                    })}
                  </>
                </div>
              </section>
              <section className="mt-80"></section>
            </section>
          </main>
        )}
        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            createItem={createTask}
            editItem={updateTask}
            modalItemData={modalItemData}
            setModalItemData={setModalItemData}
          />
        )}
      </div>
    </>
  );
};

export default Home;
