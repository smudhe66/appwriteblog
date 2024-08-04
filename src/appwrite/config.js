import conf from "../conf/conf";
import {Client, Databases, Storage, ID, Query} from "appwrite"

export class Service{
    client = new Client();
    database;
    storage; // bucket

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId})
    {
        try {
            return await this.database.createDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{title, content, featuredImage, status})
    {
        try {
            return await this.database.updateDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug)
    {
        try {
            await this.database.deleteDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }

    }

    async getPost(slug)
    {
        try {
            return await this.database.getDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
        }
    }

    async getPosts()
    {
        try {
            return await this.database.listDocuments(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                [
                    Query.equal('status','active')
                ]
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    //file uploda services

    async uploadFile(file)
    {
        try {
            return await this.storage.createFile(
                conf.appWriteBucketId,
                
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async deleteFile(fileId)
    {
        try {
            await this.storage.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            throw error
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;