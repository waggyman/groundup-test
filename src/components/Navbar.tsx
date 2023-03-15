import logo from "../assets/logo-groundup.png"
import notifIcon from "../assets/icons/icon-notification.svg"
import userIcon from "../assets/icons/icon-user.svg"
import gearIcon from "../assets/icons/icon-gear.svg"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap pl-6 pr-6 bg-white border-b-2">
      <div className="flex items-center justify-center flex-shrink-0 text-white" style={{width: '200px'}}>
        <img src={logo} alt=""/>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-sm">
        <div className="pl-6 pr-6 pt-3 pb-3">
          DASHBOARD
        </div>
        <div className="pl-6 pr-6 pt-3 pb-3 border-b-4 border-gr-default-blue bg-gr-blue-opac text-sm">
          ALERT
        </div>
      </div>
      <div className="flex">
        <div className="pr-2">
          <strong className="relative inline-flex items-center rounded px-1 py-1.5 text-xs font-medium">
            <span className="ml-1.5 text-green-700">
              <img src={gearIcon} alt="" />
            </span>
          </strong>
        </div>
        <div className="pr-2">
          <strong className="relative inline-flex items-center rounded px-1 py-1.5 text-xs font-medium">
            <span className="ml-1.5 text-green-700">
              <img src={userIcon} alt="" />
            </span>
          </strong>
        </div>
        <div className="pr-5">
          <strong className="relative inline-flex items-center rounded px-1 py-1.5 text-xs font-medium">
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full mt-1 bg-gr-default-blue text-white flex justify-center items-center items"><span>2</span></span>
            <span className="ml-1.5 text-green-700">
              <img src={notifIcon} alt="" />
            </span>
          </strong>
        </div>
        |
        <span  className="inline-block text-sm px-4 py-2 leading-none border rounded border-white mt-4 lg:mt-0">Hello Admin!</span>
      </div>
    </nav>
  )
}

export default Navbar