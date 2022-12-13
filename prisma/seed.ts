import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient()

async function main() {

    /*
    SEEDING DEFAULT USERS
    */
    console.log('Start seeding users')
    await prisma.user.deleteMany({})
    let password = await bcrypt.hash("password", 20)
    await prisma.user.createMany({
        data: [
            {
                email: 'hello@opay.com',
                name: 'Hello',
                username: 'hello',
                phone: '+237782322978',
                address: 'Douala',
                is_admin: true,
                is_staff: true,
                email_verified_at: new Date(),
                password: password
            },
            {
                email: 'defaultuser@opay.com',
                name: 'Default User',
                username: 'default',
                phone: '+237682322978',
                address: 'Douala',
                email_verified_at: new Date(),
                password: password
            }
        ]
    });
    console.log('End seeding users')

    /*
    SEEDING BUSINESS CATEGORY
    */
    console.log('Start seeding business category')
    await prisma.businessCategory.deleteMany({})
    await prisma.businessCategory.createMany({
        data: [
            { name: JSON.stringify({ "en": "Accounting", "fr": "Comptabilité" }) },
            { name: JSON.stringify({ "en": "Fashion", "fr": "Fashion" }) },
            { name: JSON.stringify({ "en": "supermaket", "fr": "Supermarchés" }) },
            { name: JSON.stringify({ "en": "pharmacy", "fr": "Produits pharmaceutiques" }) },
            { name: JSON.stringify({ "en": "Music", "fr": "Musique" }) },
            { name: JSON.stringify({ "en": "health", "fr": "Santé/Forme physique" }) },
            { name: JSON.stringify({ "en": "food", "fr": "Nourriture/boissons" }) },
            { name: JSON.stringify({ "en": "E Learning", "fr": "Apprentissage en ligne" }) },
            { name: JSON.stringify({ "en": "organisation civic/sociale", "fr": "Organisation civique/sociale" }) },
            { name: JSON.stringify({ "en": "game", "fr": "jeux video" }) },
            { name: JSON.stringify({ "en": "Software and computer engineering", "fr": "logiciels et ingénierie informatique" }) },
            { name: JSON.stringify({ "en": "Computer and network security", "fr": "Sécurité des ordinateurs et des réseaux" }) },
            { name: JSON.stringify({ "en": "e-commerce", "fr": "e-commerce" }) },
            { name: JSON.stringify({ "en": "restaurants", "fr": "restaurants" }) },
            { name: JSON.stringify({ "en": "real state", "fr": "Immobilier commercial" }) },
            { name: JSON.stringify({ "en": "electronic", "fr": "electronique" }) },
            { name: JSON.stringify({ "en": "Event Services", "fr": "Services d'événements" }) },
            { name: JSON.stringify({ "en": "Entertainment / Film Production", "fr": "Divertissement / Production de films" }) },
        ]
    })
    console.log('End seeding business category')

    /*
    SEEDING PAYMENT METHOD
    */
    console.log('Start seeding payment methods')
    prisma.paymentMethod.deleteMany({})
    prisma.paymentMethod.createMany({
        data: [
            {
                name: "Mtn Mobile Money",
                code: "MOMO",
                can_cash_out: true
            },
            {
                name: "Orange Mobile Money",
                code: "OM"
            }
        ]
    })
    console.log('End seeding payment methods')

    /*
    SEEDING PLATFORM SETTINGS
    */
    console.log('Start seeding platform settings');
    const fs = require('fs')
    let settings = fs.readFileSync('./src/settings.json', 'utf8')
    settings = JSON.parse(settings)
    await prisma.platformSetting.deleteMany({})
    Object.keys(settings).forEach(async function (key, value) {
        await prisma.platformSetting.create({
            data: {
                key: key,
                value: value.toString()
            }
        })
    })
    console.log('End seeding platform settings');
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
