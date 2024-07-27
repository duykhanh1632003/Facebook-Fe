import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuthContext } from "./context/AuthContext";
import { useEffect, Suspense, lazy } from "react";
import { PostContextProvider } from "./context/PostContext.jsx";
import { VideoPostProvider } from "./context/VideoPostContext.jsx";
import { TinderContextProvider } from "./context/TinderContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

// Lazy load components
const SignUp = lazy(() => import("./pages/Auth/SignUp/SignUp"));
const SignIn = lazy(() => import("./pages/Auth/SignIn/SignIn"));
const RootLayout = lazy(() => import("./components/RootLayout"));
const MiddleSideBar = lazy(() =>
  import("./pages/HomePage/Home-middle/MiddleSideBar")
);
const FriendContainer = lazy(() => import("./pages/Friends/FriendContainer"));
const DetailPost = lazy(() =>
  import("./pages/HomePage/Home-middle/Post/detail/DetailPost")
);
const FriendLayout = lazy(() => import("./pages/Friends/FriendLayout"));
const ProfileLayout = lazy(() => import("./pages/Profile/ProfileLayout"));
const HomeProfile = lazy(() => import("./pages/Profile/HomeProfile"));
const CreateStories = lazy(() =>
  import("./pages/HomePage/Home-middle/Story/CreateStories.jsx")
);
const GoogleSuccess = lazy(() => import("./components/GoogleSuccess.jsx"));
const ForgotPassWordLayout = lazy(() =>
  import("./pages/Auth/forgotPassword/ForgotpassWordLayout.jsx")
);
const Test = lazy(() => import("./test/Test.jsx"));
const StoryContainer = lazy(() => import("./pages/Story/StoryContainer.jsx"));
const WatchLayout = lazy(() => import("./pages/watch/WatchLayout.jsx"));
const WatchContainer = lazy(() => import("./pages/watch/WatchContainer.jsx"));
const TinderLayout = lazy(() => import("./pages/tinder/TinderLayout.jsx"));
const TinderContainer = lazy(() =>
  import("./pages/tinder/TinderContainer.jsx")
);
const CreateAccount = lazy(() =>
  import("./pages/tinder/OnBoard/CreateAccount.jsx")
);
const Recs = lazy(() => import("./pages/tinder/Recs/Recs.jsx"));
const ShopLayout = lazy(() => import("./pages/shop/shopLayout.jsx"));
const Dashboard = lazy(() => import("./pages/shop/Dashboard/Dashboard.jsx"));
const ProductList = lazy(() =>
  import("./pages/shop/Product/ProductList/ProductList.jsx")
);
const ProductUpload = lazy(() =>
  import("./pages/shop/Product/ProductUpload/ProductUpload.jsx")
);
const ListAttributes = lazy(() =>
  import("./pages/shop/Product/Attributes/ListAttributes/ListAttributes.jsx")
);
const CreateAttributes = lazy(() =>
  import(
    "./pages/shop/Product/Attributes/CreateAttributes/CreateAttributes.jsx"
  )
);

function App() {
  const { authUser } = useAuthContext();

  useEffect(() => {
    console.log("check auth", authUser);
  }, [authUser]);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
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
          <Route
            element={authUser ? <FriendLayout /> : <Navigate to="/login" />}
          >
            <Route path="/friends" element={<FriendContainer />} />
          </Route>
          <Route
            path="/tinder/recs"
            element={
              authUser ? (
                <TinderContextProvider>
                  <Recs />
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
                  <TinderLayout />
                </TinderContextProvider>
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route path="/tinder/onBoard" element={<CreateAccount />} />
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
            <Route path="/watch" element={<WatchContainer />} />
          </Route>
          <Route
            path="/story"
            element={authUser ? <StoryContainer /> : <Navigate to="/login" />}
          />
          <Route
            element={authUser ? <ProfileLayout /> : <Navigate to="/login" />}
          >
            <Route path="/profile/:id" element={<HomeProfile />} />
          </Route>
          <Route element={authUser ? <ShopLayout /> : <Navigate to="/login" />}>
            <Route path="/shop" element={<Dashboard />} />
            <Route path="/shop/product-list" element={<ProductList />} />
            <Route path="/shop/product-upload" element={<ProductUpload />} />
            <Route path="/shop/attributes-list" element={<ListAttributes />} />
            <Route path="/shop/add-attributes" element={<CreateAttributes />} />
          </Route>
          <Route path="/stories/create" element={<CreateStories />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
