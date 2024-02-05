//import { describe } from "mocha";

describe('PetsStore API tests', () => {
    it('Pet inventory by status', () => {
        cy.request('https://petstore.swagger.io/v2/store/inventory').then(response => {
          expect(response.status).to.equal(200);
        })
     });
     
    it('Verify creating of a new user', () => {
        const userData = {
            "id": 18,
            "username": "inna_a8",
            "firstName": "Inna7",
            "lastName": "Test7",
            "email": "testinna7@email.com",
            "password": "qwerty123",
            "phone": "1234567890",
            "userStatus": 5
        };
        cy.request('POST', 'https://petstore.swagger.io/v2/user', userData).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.eql({
                    "code": 200,
                    "type": "unknown",
                    "message": "18"      
            })
        })
    });

    it('Log in with user', () => {
        cy.request(
            {
                method: 'GET',
                url: 'https://petstore.swagger.io/v2/user/login',
                auth:{
                    username: 'inna_a',
                    password: 'qwerty123'

                }
            }
        )
        .then((response)=>{
            expect(response.status).to.be.equal(200)
        })
    });

    it('Verify creating of list of users', () => {
        const usersData = [
            {
              "id": 30,
              "username": "inna_a30",
              "firstName": "Inna31",
              "lastName": "Test30",
              "email": "test20@email.com",
              "password": "qwerty123",
              "phone": "1234567890",
              "userStatus": 2
            },
            {
              "id": 31,
              "username": "inna_a31",
              "firstName": "Inna31",
              "lastName": "Test31",
              "email": "test21@email.com",
              "password": "qwerty123",
              "phone": "1234567890",
              "userStatus": 3
            },
            {
              "id": 32,
              "username": "inna_a32",
              "firstName": "Inna32",
              "lastName": "Test32",
              "email": "test22@email.com",
              "password": "qwerty123",
              "phone": "1234567890",
              "userStatus": 4
            }
          ];
        cy.request('POST', 'https://petstore.swagger.io/v2/user/createWithList', usersData).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.eql({
                "code": 200,
                "type": "unknown",
                "message": "ok"     
            })
        })
    });

    it('Verify user can be logged out', () => {
        cy.request('https://petstore.swagger.io/v2/user/logout').then(response => {
          expect(response.status).to.equal(200);
        })
     });

     it('Verify creating of a new pet', () => {
        const petData = {
            "id": 12,
            "category": {
              "id": 2,
              "name": "Cats"
            },
            "name": "Cat2",
            "photoUrls": [
              "https://www.rawpixel.com/image/12351222/png-white-background-cat"
            ],
            "tags": [
              {
                "id": 2,
                "name": "tag name2"
              }
            ],
            "status": "available"
        };
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', petData).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.eql({
                ...petData
            })
        });

    });

    it('Verify updating of a new pet', () => {
        const petDataUpdate = {
            "id": 12,
            "name": "Cat2Updated",
            "status": "not available"
        };
        cy.request('PUT', 'https://petstore.swagger.io/v2/pet', petDataUpdate).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('name').and.to.eql('Cat2Updated');
            expect(response.body).to.have.property('status').and.to.eql('not available');
        });

    });

    it('Uploading image for a pet', () => {
        cy.visit('https://petstore.swagger.io/#/');
        cy.fixture('Cat Black.jpg', null).as('myCatImage');
cy.get('input[type=file]').selectFile('@myCatImage')
        });

        it('Verify deleting of a pet', () => {
            cy.request('DELETE', 'https://petstore.swagger.io/v2/pet/12').then(response => {
                expect(response.status).to.equal(200);
                expect(response.body).eql({
                    "code": 200,
                    "type": "unknown",
                    "message": "12"
                });
            });
         });
     });

 
