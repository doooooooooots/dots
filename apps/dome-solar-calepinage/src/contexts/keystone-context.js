/* eslint-disable no-undef */
import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

const LOGIN_REQUEST = gql`
  mutation ($email: String!, $password: String!) {
    authenticate: authenticateUserWithPassword(
      email: $email
      password: $password
    ) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        user: item {
          id
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;
const REGISTER_REQUEST = gql`
  mutation ($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      name
      email
    }
  }
`;
const LOGOUT_REQUEST = gql`
  mutation {
    endSession
  }
`;

var ActionType;
(function (ActionType) {
  ActionType['INITIALIZE'] = 'INITIALIZE';
  ActionType['LOGIN'] = 'LOGIN';
  ActionType['LOGOUT'] = 'LOGOUT';
  ActionType['REGISTER'] = 'REGISTER';
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  platform: 'keystone',
};

//* Handlers - Change context values
const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

//* Logic
export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const [loginQuery] = useMutation(LOGIN_REQUEST);
  const [logoutQuery] = useMutation(LOGOUT_REQUEST);

  useEffect(() => {
    const initialize = async () => {
      try {
        // eslint-disable-next-line no-undef
        const sessionToken = globalThis.localStorage.getItem('sessionToken');

        if (sessionToken) {
          // const user = await authApi.me(sessionToken);
          const user = {};

          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const {
      data: { authenticate },
    } = await loginQuery({
      variables: { email: email, password: password },
    });

    const { sessionToken, user } = authenticate;

    if (!sessionToken) throw new Error('Credentials are not valid');

    localStorage.setItem('sessionToken', sessionToken);

    dispatch({
      type: ActionType.LOGIN,
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    await logoutQuery();
    localStorage.removeItem('sessionToken');
    dispatch({ type: ActionType.LOGOUT });
  };

  const register = async (email, name, password) => {
    // const sessionToken = await authApi.register({ email, name, password });
    // const user = await authApi.me(sessionToken);

    localStorage.setItem('sessionToken', sessionToken);

    dispatch({
      type: ActionType.REGISTER,
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'keystone',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
