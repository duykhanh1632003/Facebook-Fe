import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/Auth/SignUp/SignUp";
import SignIn from "./pages/Auth/SignIn/SignIn";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./components/RootLayout";
import MiddleSideBar from "./pages/HomePage/Home-middle/MiddleSideBar";
import FriendContainer from "./pages/Friends/FriendContainer";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import DetailPost from "./pages/HomePage/Home-middle/Post/detail/DetailPost";
import FriendLayout from "./pages/Friends/FriendLayout";
import ProfileLayout from "./pages/Profile/ProfileLayout";
import HomeProfile from "./pages/Profile/HomeProfile";
import { PostContextProvider } from "./context/PostContext.jsx";
import CreateStories from "./pages/HomePage/Home-middle/Story/CreateStories.jsx";
import GoogleSuccess from "./components/GoogleSuccess.jsx";
import ForgotPassWordLayout from "./pages/Auth/forgotPassword/ForgotpassWordLayout.jsx";
import Test from "./test/Test.jsx";
import StoryContainer from "./pages/Story/StoryContainer.jsx";
import WatchLayout from "./pages/watch/WatchLayout.jsx";
import WatchContainer from "./pages/watch/WatchContainer.jsx";
import { VideoPostProvider } from "./context/VideoPostContext.jsx";
import TinderLayout from "./pages/tinder/TinderLayout.jsx";
import TinderContainer from "./pages/tinder/TinderContainer.jsx";
import CreateAccount from "./pages/tinder/OnBoard/CreateAccount.jsx";
import Recs from "./pages/tinder/Recs/Recs.jsx";
import { TinderContextProvider } from "./context/TinderContext.jsx";
import ShopLayout from "./pages/shop/shopLayout.jsx";
import Dashboard from "./pages/shop/Dashboard/Dashboard.jsx";
import ProductList from "./pages/shop/Product/ProductList/ProductList.jsx";
import ProductUpload from "./pages/shop/Product/ProductUpload/ProductUpload.jsx";
import ListAttributes from "./pages/shop/Product/Attributes/ListAttributes/ListAttributes.jsx";
function App() {
  const { authUser } = useAuthContext();
  useEffect(() => {
    console.log("check auth", authUser);
  }, []);
  return (
    <main>
      <Routes>
        {/* Public routes */}
        <Route path="/test" element={<Test />} />

        <Route path="/auth/google/success" element={<GoogleSuccess />} />
        <Route
          path="/forgot"
          element={!authUser ? <ForgotPassWordLayout /> : <Navigate to="/" />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <SignIn /> : <Navigate to="/" />}
        />

        {/* Private routes */}
        <Route element={authUser ? <RootLayout /> : <Navigate to="/login" />}>
          <Route index element={<MiddleSideBar />} />
        </Route>
        <Route
          path="/photo/:id"
          element={
            authUser ? (
              <PostContextProvider>
                <DetailPost />
              </PostContextProvider>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route element={authUser ? <FriendLayout /> : <Navigate to="/login" />}>
          <Route
            path="/friends"
            element={authUser ? <FriendContainer /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="/tinder/recs"
          element={
            authUser ? (
              <TinderContextProvider>
                {" "}
                <Recs />{" "}
              </TinderContextProvider>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          element={
            authUser ? (
              <TinderContextProvider>
                <TinderLayout />{" "}
              </TinderContextProvider>
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route
            path="/tinder/onBoard"
            element={authUser ? <CreateAccount /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          element={
            authUser ? (
              <VideoPostProvider>
                <WatchLayout />
              </VideoPostProvider>
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route
            path="/watch"
            element={authUser ? <WatchContainer /> : <Navigate to="/login" />}
          />
        </Route>

        <Route
          path="/story"
          element={authUser ? <StoryContainer /> : <Navigate to="/login" />}
        />
        <Route
          element={authUser ? <ProfileLayout /> : <Navigate to="/login" />}
        >
          <Route
            path="/profile/:id"
            element={authUser ? <HomeProfile /> : <Navigate to="/login" />}
          />
        </Route>
        <Route element={authUser ? <ShopLayout /> : <Navigate to="/login" />}>
          <Route
            path="/shop"
            element={authUser ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/shop/product-list"
            element={authUser ? <ProductList /> : <Navigate to="/login" />}
          />
          <Route
            path="/shop/product-upload"
            element={authUser ? <ProductUpload /> : <Navigate to="/login" />}
          />
          <Route
            path="/shop/attributes-list"
            element={authUser ? <ListAttributes /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="/stories/create"
          element={authUser ? <CreateStories /> : <Navigate to="/login" />}
        />
      </Routes>
    </main>
  );
}

export default App;
