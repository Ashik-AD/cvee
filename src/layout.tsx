import { FlexColumn } from './components/common/layout';
import Navbar from '@/components/common/navbar';
import Editor from './features/editor';
import Dashbord from './features/dashboard';
import { useEffect } from 'react';
import { useResumeActions } from './store';
import { Route } from 'wouter';
import ModalRender from './components/modals';
import ResumePreview from './components/common/ResumePreview';
import CommandCenter from './components/common/CommandCenter';
import useHandleActionsGlobal from './hooks/useHandleActionsGlobal';
import AlertDialogsRender from './components/dialogs';
import { useFetchResumes } from './api';
import { toast } from './components/ui/toast';

function Layout() {
  const { setResumes } = useResumeActions();

  // Fetch all resumes from the database for dashboard to show
  const { data: resumes, isPending, error } = useFetchResumes();

  // Handle global keyboard shortcuts
  useHandleActionsGlobal();

  useEffect(() => {
    if (isPending || !resumes) return;
    setResumes(resumes);
  }, [resumes, isPending]);

  useEffect(() => {
    if (error) {
      toast.add({
        type: 'error',
        title: error,
      });
    }
  }, [error]);

  return (
    <FlexColumn className="overflow-hidden">
      <Navbar />
      <div className="main-content max-h-[calc(100svh-40px)] overflow-hidden md:max-h-[calc(100svh-44px)]">
        <Route path="/">
          <Dashbord />
        </Route>
        <Route path="/editor" component={Editor} />
      </div>
      <ModalRender />
      <AlertDialogsRender />
      <ResumePreview />
      <CommandCenter />
    </FlexColumn>
  );
}

export default Layout;
