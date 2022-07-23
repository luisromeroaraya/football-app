import Header from "./components/header/Header"
import Menu from "./components/menu/Menu"

const Layout = ({children}) => {
  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-hidden">
        <Header/>
        <Menu/>
    </div>
  )
}

export default Layout