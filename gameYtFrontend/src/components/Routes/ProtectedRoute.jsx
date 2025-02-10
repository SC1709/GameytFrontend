import { Navigate } from "react-router-dom";
import useQuestionStore from "../../store/zustand";

function ProtectedRoute({ children }) {
  const { page, question: allQuestions } = useQuestionStore();

  if (page > allQuestions.length) {
    return <Navigate to="/finish" replace />;
  }
  return children;
}

export default ProtectedRoute;
