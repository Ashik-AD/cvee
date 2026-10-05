import { FlexColumn } from "./components/common/layout";
import Navbar from "@/components/common/navbar";
import Editor from "./features/editor";
import Dashbord from "./features/dashboard";
import { useEffect } from "react";
import useServices from "./hooks/useServices";
import { useResumeActions } from "./store";
import { Route } from "wouter";
import ModalRender from "./components/modals";
import ResumePreview from "./components/common/ResumePreview";
import CommandCenter from "./components/common/CommandCenter";
import useHandleActionsGlobal from "./hooks/useHandleActionsGlobal";
import AlertDialogsRender from "./components/dialogs";

function Layout() {
  const { services } = useServices();
  const { setResumes } = useResumeActions();

  // Handle global keyboard shortcuts
  useHandleActionsGlobal();

  // Fetch all resumes from the database for dashboard to show
  useEffect(() => {
    if (services) {
      services.editor
        .getResumes()
        .then((resumes) => {
          setResumes(resumes);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [services]);

  return (
    <FlexColumn className="overflow-hidden">
      <Navbar />
      <div className="max-h-[calc(100svh-40px)] md:max-h-[calc(100svh-44px)] main-content overflow-y-auto scrollbar-thin">
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
