import bcrypt from "bcryptjs";
import type { Request, Response, NextFunction } from "express";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
import jwt from 'jsonwebtoken'
import * as crypto from "crypto"
import moment from "moment";
export let Tokens = new Map();
export let BlacklistedTokens: string[] = [];
import { APP_CONFIG } from "@/config/site-config";


class Helpers {
  
    /**
    * Generates a token of random bytes with the specified byte length.
    *
    * @param {number} byteLength - The length of the token in bytes. Defaults to 48.
    * @return {string} - The generated token as a base64-encoded string.
    */
    generateToken(byteLength: number = 48): string {
        return crypto.randomBytes(byteLength).toString("base64")
    }
    /**
     * Generates a refresh token of a specified length.
     *
     * @param {number} byteLength - The length of the refresh token in bytes. Defaults to 32.
     * @return {string} - The generated refresh token.
     */
    CreateRefreshToken(byteLength: number = 32): string {
        return crypto.randomBytes(byteLength).toString("base64")
    }
    /**
     * Generates a random request ID with the specified byte length.
     *
     * @param {number} byteLength - The length of the byte array used to generate the request ID. Defaults to 16.
     * @return {string} - The generated request ID as a base64 encoded string.
     */
    RequestId(byteLength: number = 16): string {
        return crypto.randomBytes(byteLength).toString("base64")
    }
    /**
     * Generates a new refresh token for the given ID and stores it in the Tokens map.
     *
     * @param {string} id - The ID of the user for whom the refresh token is generated.
     * @return {string} - The newly generated refresh token.
     */
    HandleRefreshToken(id: string): string {
        const RefreshToken = this.CreateRefreshToken()
        Tokens.set(id, RefreshToken)
        return RefreshToken
    }
    /**
     * Converts a string to a number.
     *
     *  
     * @return {number} The converted number.
     */
    CreateOTP(min: number = 100000, max: number = 999999): number {
        return Math.floor(
            Math.random() * (max - min + 1) + min
        )

    }
    /**
     * Converts a query string to an object.
     *
     * @param {string} query - The query string to convert.
     * @return {object} The resulting object.
     */
    QueryToObject(query: string): object {
        let NewObject = {}
        query.split("&").map(item => {
            const [key, value] = item.split("=")
            Object.assign(NewObject, Object.fromEntries([[key, value]]))
            return Object.fromEntries([[key, value]])
        })

        return NewObject
    }
    /**
     * Converts a string representation of a date word into a formatted date string.
     *
     * @param {string} str - The string representation of the date word.
     * @return {string} - The formatted date string.
     */
    ConvertDateWordsToDate(str: string): string {
        let newDate;
        if (str === "Latest") {
            newDate = moment().subtract(10, 'minutes').toDate();
        } else if (str === "LastHour") {
            newDate = moment().subtract(1, 'hour').toDate();
        }
        else if (str === "Last24hour") {
            newDate = moment().subtract(24, 'hour').toDate();
        }
        else {
            const number = str.replace(/[^0-9]/g, '')
            newDate = moment().subtract(number, `days`).toDate();
        }

        const date = this.SimpleDateStr(newDate)
        return date
    }
    /**
     * Generates a string representation of a date.
     *
     * @param {Date} newDate - The date to convert to a string. Defaults to the current date.
     * @return {string} The string representation of the date.
     */
    SimpleDateStr(newDate: Date = new Date()): string {
        const newDateStr = newDate.toISOString().split("T")
        const date = (newDateStr[0] + " " + newDateStr[1].split(".")[0]).trim().toString()

        return date
    }
    /**
     * Cleans and purifies a string by converting it to lowercase, removing leading and trailing whitespace,
     * removing all spaces, replacing multiple spaces or underscores with a single hyphen,
     * and removing leading and trailing hyphens.
     *
     * @param {string} str - The string to be purified.
     * @return {string} The purified string.
     */
    purifyString(str: string): string {
        return str
            .toLowerCase()
            .trim()
            .replace(/\s/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }
    /**
     * Generates the keys and values of an object.
     *
     * @param {string} obj - the object to generate keys and values for
     * @return {string[]} an array containing the keys and values of the object
     */
    ObjectKeysAndValues(obj: string): string[] {
        let keys = Object.keys(JSON.parse(obj));
        const PureObject = keys.map((key) => {
            return JSON.parse(JSON.parse(obj)[key]);
        });
        return PureObject;
    }
    /**
     * Formats the salary to a string with comma-separated thousands and no decimal places.
     *
     * @param {number} salary - The salary to be formatted.
     * @return {string} - The formatted salary as a string.
     */
    FormatSalary(salary: number): string {
        return salary.toLocaleString("en-IN", { maximumFractionDigits: 0 });
    };

    /**
     * Slugify a given string.
     *
     * @param {string} str - The string to be slugified.
     * @return {string} The slugified string.
     */
    Slugify(str: string): string {

        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

    }
    async HashPassword(PasswordStr: string): Promise<string> {
        return bcrypt.hashSync(PasswordStr, salt);
    }
    async ComparePassword(HashedPassword: string, Password: string): Promise<boolean> {
        return bcrypt.compareSync(Password, HashedPassword);
    }
    signJWT(payload: any): string {

        return jwt.sign(payload, APP_CONFIG.SECRETS.JWT_SECRET_KEY, {
            expiresIn: '7d'
        });
    }
    verifyJWT(token: string): any {
        return jwt.verify(token, APP_CONFIG.SECRETS.JWT_SECRET_KEY);
    }
    decodeToken(token: string): any {
        return jwt.decode(token);
    }
    randomToken(length: number = 64): string {
        return crypto.randomBytes(length).toString('hex');
    }

}
export default new Helpers()