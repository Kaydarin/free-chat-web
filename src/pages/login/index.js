import { useDispatch, useSelector } from 'react-redux';
import { login } from '@store/app';
import { Stack, FormControl, FormLabel, Input, FormErrorMessage, Center, Divider, Button } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import './style.css'

export default function Login() {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.app);

    const handleValidate = (val) => {

        const errors = {};

        if (!val.username) {
            errors.username = 'Required';
        }

        if (!val.password) {
            errors.password = 'Required';
        }

        return errors;
    }

    const handleSubmit = (val) => {
        dispatch(login({
            username: val.username,
            password: val.password
        }));
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validate={(values) => handleValidate(values)}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {(props) => (
                        <Form>
                            <Stack spacing={5}>
                                <Field name='username'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.username && form.touched.username}>
                                            <FormLabel htmlFor='username'>Username</FormLabel>
                                            <Input {...field} id='username' placeholder='username' type='text' />
                                            <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='password'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.password && form.touched.password}>
                                            <FormLabel htmlFor='password'>Password</FormLabel>
                                            <Input {...field} id='password' placeholder='password' type='password' />
                                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <p>You can chat to each user by login to each account below (You'll need to login from another window for different user):-</p>
                                <div className="login-credentials">
                                    <div>
                                        <p>Username: user1</p>
                                        <p>Password: user1</p>
                                    </div>
                                    <Center>
                                        <Divider orientation='vertical' />
                                    </Center>
                                    <div>
                                        <p>Username: user2</p>
                                        <p>Password: user2</p>
                                    </div>
                                </div>
                                <Button
                                    mt={4}
                                    colorScheme='teal'
                                    isLoading={loading}
                                    type='submit'
                                >
                                    Submit
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )
}