import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useNavigate } from 'react-router-dom';

import {
    faCaretRight,
    faChevronLeft,
    faSeedling,
    faSurprise,
    faUsers,
    faWallet,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import './Sidebar.scss';

const menus = [
    { title: 'Quản lý người dùng', link: '/manager-user', icon: faUsers }, // more: true
    { title: 'Quản lý sự kiện', link: '/manage-event', icon: faSeedling },
    { title: 'Quản lý nạp rút', link: '/transaction', icon: faWallet },
    // { title: 'Hỗ trợ', link: '/manage-contact', icon: faSurprise },
];

function Sidebar(props) {
    let history = useNavigate();
    let { open, toggleOpen } = props;
    function Logout() {
        localStorage.removeItem('session_id');
        return history('/auth/login');
    }
    return (
        <>
            {open && <div onClick={() => toggleOpen(!open)} className="md:hidden box-shadow_side"></div>}
            <div
                className={`${
                    !open && 'translate-x-[-250px]'
                } md:translate-x-[0px] duration-150 xl:duration-300 bg-[#111c44] h-screen fixed z-20 ${
                    open ? 'w-[16rem]' : 'w-20'
                }`}
            >
                <div
                    onClick={() => {
                        toggleOpen(!open);
                        props.toggleSideBar();
                    }}
                    className={`${
                        !open && 'md:rotate-180'
                    } cursor-pointer duration-300 flex items-center justify-center right-[-15px] top-[22px] hover:right-[-8px] rounded-full w-8 h-8 absolute bg-indigo-500 shadow-lg hover:right-[${
                        open && '-6px'
                    }] shadow-indigo-500/50 text-white`}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div>
                    <div className="flex justify-center items-center gap-x-4 min-h-[5rem] shadow-sm shadow-cyan-500/50">
                        <h1 className={`${!open && 'md:scale-0'} text-white duration-100 text-xl font-bold`}>Tiki</h1>
                    </div>
                    <div>
                        <ul className="pl-2 py-2">
                            {menus.map((item) => {
                                return (
                                    <Tippy
                                        key={Math.random()}
                                        placement="right-end"
                                        content={item.title}
                                        delay={[0, 70]}
                                        className={open ? 'hidden' : 'tippy'}
                                    >
                                        <NavLink
                                            to={item.link}
                                            className={`text-gray-300 item-nav relative flex items-center gap-x-3 cursor-pointer px-2 py-3 mb-2 mr-2 hover:bg-light-white rounded-md duration-300 slide-bar_hover ${
                                                !open && 'justify-center'
                                            } 
                                    `}
                                            style={({ isActive }) =>
                                                isActive
                                                    ? {
                                                          color: '#fff',
                                                          background:
                                                              'linear-gradient(118deg,#7367f0,rgba(115,103,240,.7))',
                                                      }
                                                    : undefined
                                            }
                                        >
                                            <FontAwesomeIcon className="duration-500" icon={item.icon} />
                                            <span className={`duration-500 ${!open && 'hidden'} text-md`}>
                                                {item.title}
                                            </span>
                                            {open && item.more && (
                                                <FontAwesomeIcon
                                                    className="absolute duration-300 right-[20px] arrow-more"
                                                    icon={faCaretRight}
                                                />
                                            )}
                                            {/* {open && <div className="slide-bar_active"></div>} */}
                                        </NavLink>
                                    </Tippy>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
