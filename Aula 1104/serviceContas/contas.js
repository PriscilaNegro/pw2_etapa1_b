const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')

module.exports = {
    
    createAccount() {
        console.log(chalk.bgGreen.black('Bem Vindo ao Contas ETEC Bank!'))
        console.log(chalk.green('Siga as orientações a seguir:'))
    
        this.buildAccount()
    },
    operation() {
    
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que deseja fazer?',
                choices: [
                    'Criar conta',
                    'Consultar saldo',
                    'Depositar',
                    'Sacar',
                    'Sair'
                ]
            }
        ]).then((answer) => {
            const action = answer['action']
            if (action === 'Criar conta') {
                console.log('Criando a conta...')
                this.createAccount()
            } else if (action === 'Consultar saldo') {
                console.log('Consulatndo seu saldo...')
                accountBalance()
            } else if (action === 'Depositar') {
                console.log('Depositando em sua conta...')
                deposit()
            } else if (action === 'Sacar') {
                console.log('Sacando de sua conta...')
                withdraw()
            } else if (action === 'Sair') {
                console.log(chalk.bgBlue.black('SAINDO DA APLICAÇÃO CONTAS ETEC'))
                setTimeout(() => {
                    process.exit()
                }, 1500);
            }
        })
    },

     buildAccount() {
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Entre com o nome da conta:'
            }
        ]).then((answer) => {
            const accountName = answer['accountName']
    
            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts')
            }
    
            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(chalk.bgRed.black('Esta conta já existe!'))
                this.buildAccount(accountName)
                return
            }
    
            fs.writeFileSync(
                `accounts/${accountName}.json`,
                '{"balance":0, "limit":1000}',
                function (err) {
                    console.error(err)
                }
            )
            console.info(chalk.green('Parabéns! Sua conta no ETEC Bank foi criada.'))
            this.operation()
        })
    },
}

