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

function Layout() {
  const { services } = useServices();
  const { setResumes } = useResumeActions();

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
      <div className="h-[calc(100svh-46px)] main-content overflow-y-auto scrollbar-thin">
        <Route path="/">
          <Dashbord />
        </Route>
        <Route path="/editor" component={Editor} />
      </div>
      <ModalRender />
      <ResumePreview />
    </FlexColumn>
  );
}

export default Layout;
