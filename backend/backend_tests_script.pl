#!/usr/bin/perl 
use strict;
use Cwd;

my $curTest;
our $passedTests = 0;
our $numTests = 0;
my $nullFile = '/dev/null'; # change to NUL for Windows -> my $nullFile = 'NUL'

sub check_test {
    my $curStr = shift;
    my $curTest = shift;
    $numTests = $numTests + 1;
    if ($curStr) {
        $passedTests = $passedTests + 1;
    } else {
        print("Test $curTest failed\n");
    }
}

#######################
# Section 1: Signup api
#######################
# Test 1.1: this tests signs a user up; should return success 
$curTest = `curl -X POST http://127.0.0.1:5000/sign-up -d \'{ "username": "ta2", "password": "123", "email": "test2\@email.com" }\' -H "Content-Type: application/json" 2>$nullFile | grep success`;
check_test($curTest, 1.1);

# Test 1.2: this test doesn't include username; should return failure with error message "missing username" 
$curTest = `curl -X POST http://127.0.0.1:5000/sign-up -d \'{ "password": "123", "email": "test\@email.com" }\' -H "Content-Type: application/json" 2>$nullFile | grep failed`;
check_test($curTest, 1.2);

# Test 1.3: this test doesn't include password; should return failure with error message "missing password" 
$curTest = `curl -X POST http://127.0.0.1:5000/sign-up -d \'{ "username": "ta2", "email": "test2\@email.com" }\' -H "Content-Type: application/json" 2>$nullFile | grep failed`;
check_test($curTest, 1.3);

# Test 1.4: this test doesn't include email; should return failure with error message "missing email" 
$curTest = `curl -X POST http://127.0.0.1:5000/sign-up -d \'{ "username": "ta2", "password": "123" }\' -H "Content-Type: application/json" 2>$nullFile | grep failed`;
check_test($curTest, 1.4);


######################
# Section 2: Login api
###################### 
# Test 2.1: this tests logging in a real user; should return success 
$curTest = `curl -X POST http://127.0.0.1:5000/login -d \'{ "username": "ta1", "password": "123" }\' -H "Content-Type: application/json" 2>$nullFile | grep success`;
check_test($curTest, 2.1);

# Test 2.2: this tests logging in with bad credentials; should return failure with error message "user not found" 
$curTest = `curl -X POST http://127.0.0.1:5000/login -d \'{ "username": "NOTta1", "password": "123" }\' -H "Content-Type: application/json" 2>$nullFile | grep failed`;
check_test($curTest, 2.2);


END {
    print("Tests passed: $passedTests/$numTests\n");
    if (!$passedTests) {
        print("Make sure the backend server is running\n");
    }
}