import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const toast = useToast()
    const navigate = useNavigate()

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const submitHandler = async() => {
        if(!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please, Fill all the Fields..!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top"
              })
            return;
        }

        if(password !== confirmPassword) {
            toast({
                title: 'Password Do Not Match..!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top"
              })
            return;
        }

        try {

            const {data} = await axios.post('/api/user/register', {name, email, password});

            toast({
                title: 'Registration Successful..!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "top"
            })

            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/tasks')
        } catch (error) {
            toast({
                title: 'Error Occured..!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top"
              })
        }
    }

  return (
    <VStack spacing='5px'>

        <FormControl id='name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
                placeholder='Enter Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)} 
            />
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
            />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='confirm-password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Enter Your Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <Button
            colorScheme='blue'
            w="100%"
            style={{marginTop: 15}}
            onClick={submitHandler}
        >
            Sign Up
        </Button>

    </VStack>
  )
}

export default Signup