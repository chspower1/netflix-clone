import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useRoutes } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
    z-index: 1000;
    display: flex;
    position: fixed;
    justify-content: space-between;
    height: 60px;
    width: 100%;
    margin-bottom: 60px;
`;
const Col = styled.div`
    display: flex;
    align-items: center;
`;
const Items = styled.ul`
    display: flex;
    align-items: center;
`;
const Logo = styled(motion.svg)`
    width: 100px;
    margin: 0px 30px;
`;
const Item = styled.li`
    position: relative;
    padding: 10px;
    display: flex;
    justify-content: center;
`;
const CurCircle = styled(motion.div)`
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    bottom: -3px;

    background-color: rgb(216, 31, 38);
`;
const SearchBox = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
`;
const Magnifify = styled(motion.svg)`
    z-index: 10;
`;
const Input = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    right: 50px;
    text-align: center;
    height: 30px;
    border-radius: 15px;
    border: none;
`;
// Variants
const LogoVariants = {
    normal: {
        fill: "rgb(216, 31, 38)",
    },
    active: {
        fill: "rgb(0,0,0)",
    },
};
const navVariants = {
    top: {
        backgroundColor: "rgba(212, 212, 212,0)",
    },
    scroll: {
        backgroundColor: "rgba(212, 212, 212,1)",
    },
};

// Interface
interface SearchForm {
    keyword: string;
}
export default function Header() {
    const { pathname } = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();
    const [curState, setCurState] = useState(pathname === "/" ? "home" : pathname.slice(1));
    const { register, handleSubmit, reset } = useForm<SearchForm>();
    const { scrollY } = useScroll();
    const navAnimation = useAnimation();
    const navMenus = ["home", "series", "movie"];
    const navKorMenus = ["???", "?????????", "??????"];

    console.log(curState);

    const onvalid = (data: SearchForm) => {
        navigate(`/search?keyword=${data.keyword}`);
        console.log(data);
    };
    const toggleSearch = () => setSearchOpen((cur) => !cur);
    useEffect(() => {
        scrollY.onChange(() => {
            // console.log(scrollY.get());
            if (scrollY.get() > 80) {
                navAnimation.start("scroll");
            } else {
                navAnimation.start("top");
            }
        });
    }, []);
    useEffect(() => {
        console.log(pathname);
        // setCurState();
    }, [pathname]);
    return (
        <Nav variants={navVariants} initial="top" animate={navAnimation}>
            <Col>
                <Link to="/">
                    <Logo
                        onClick={() => setCurState("home")}
                        variants={LogoVariants}
                        initial="normal"
                        whileHover="active"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 276.742"
                    >
                        <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
                    </Logo>
                </Link>
                <Items>
                    {navMenus.map((menu, index) => (
                        <Link key={index} to={menu === "home" ? "/" : menu}>
                            <Item onClick={() => setCurState(menu)}>
                                {navKorMenus[index]}
                                {curState === menu && <CurCircle layoutId="point" />}
                            </Item>
                        </Link>
                    ))}
                </Items>
            </Col>
            <Col>
                <SearchBox onSubmit={handleSubmit(onvalid)}>
                    <Magnifify
                        onClick={toggleSearch}
                        width={20}
                        animate={{ x: searchOpen ? -145 : 0 }}
                        transition={{ duration: 0.6 }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
                    </Magnifify>
                    <AnimatePresence>
                        {searchOpen && (
                            <Input
                                {...register("keyword", {
                                    required: "???????????? ??????????????????",
                                    minLength: {
                                        value: 2,
                                        message: "????????? ?????? ??????????????????",
                                    },
                                })}
                                type="text"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                exit={{ scaleX: 0 }}
                                transition={{ duration: 0.6 }}
                                placeholder="Search for movie"
                            />
                        )}
                    </AnimatePresence>
                </SearchBox>
                {/* <div>
                    <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                    </svg>
                </div> */}
            </Col>
        </Nav>
    );
}
