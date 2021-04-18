import CourseForm from "./components/CourseForm"
import Header from "./components/Header"
import { Container, CssBaseline } from "@material-ui/core"
import CoursesPage from "./pages/CoursesPage"
import CoursesListPage from "./pages/CoursesListPage"

function App() {
  return (
    <>
      <Container>
        <CssBaseline />
        <Header />
        <CoursesPage />
        <CoursesListPage />
      </Container>
    </>
  )
}

export default App
