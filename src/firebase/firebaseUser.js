import { config } from "./firebaseConfig";

import { useSelector, useDispatch } from "react-redux";
import { addToFavorite, signIn } from "../features/Auth/actions/user";

firebase.initializeApp(config);
