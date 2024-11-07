import {pgTable, serial, text, timestamp, varchar,integer, pgEnum} from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user']);

export const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    pdfName : text('pdfName').notNull(),
    pdfURL : text('pdfURL').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    userID: varchar('user_id',{length: 255}).notNull(),
    fileKey: text('fileKey').notNull()
});


export const messages = pgTable('messages', {
    id:serial('id').primaryKey(),
    chatId:integer('chat_id')
        .references(()=>chats.id)
        .notNull(),
    content:text('content').notNull(),
    createdAt:timestamp('createdAt').notNull().defaultNow(),
    role:userSystemEnum('role').notNull()
});
//This is where all our table definitions are going to go
//Each chat in my website is oging to be be one row within my db 
//Each chat will contain name of pdf, url to it , USERID related to it and whatever chat is there
// File key is going to be text that is used to retriev the file from the s3 bucket
//To push schema to neonDb we need drizzlekit
// drizzle-orm 
// drizzlekit is a tool that allows us to push our schema to the database and all db is synced up with the above schema