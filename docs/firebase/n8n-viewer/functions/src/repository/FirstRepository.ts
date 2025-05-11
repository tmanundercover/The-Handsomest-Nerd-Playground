import { db } from '../config/firebase';
import * as logger from "firebase-functions/logger";
import { FirstType } from '../types/First.types';

async function firstCollectionInitialize() {
    try {
        // Get reference to the collection
        const firstCollectionRef = db.collection('firsts');
        
        // Check if collection is empty
        const snapshot = await firstCollectionRef.limit(1).get();
        
        if (!snapshot.empty) {
            logger.info("First collection is already initialized");
            return {
                success: true,
                message: "Collection already initialized"
            };
        }

        // Add initial data if collection is empty
        const batch = db.batch();
        const initialData: FirstType[] = [
            // Add your initial data objects here
            // Example:
            // {
            //     id: "first1",
            //     // ... other fields based on FirstType
            // }
        ];

        for (const data of initialData) {
            const docRef = firstCollectionRef.doc(data.id);
            batch.set(docRef, data);
        }

        await batch.commit();

        logger.info("Successfully initialized first collection");
        return {
            success: true,
            message: "Collection initialized successfully",
            count: initialData.length
        };

    } catch (error) {
        logger.error("Error initializing first collection:", error);
        return {
            success: false,
            message: "Failed to initialize collection",
            error: error
        };
    }
}

const createFirst = async (data: FirstType) => {
    try {
        const docRef = db.collection('firsts').doc(data.id);
        await docRef.set(data);
        logger.info(`Successfully created first document with id: ${data.id}`);
        return {
            success: true,
            message: "Document created successfully",
            data: data
        };
    } catch (error) {
        logger.error("Error creating first document:", error);
        return {
            success: false,
            message: "Failed to create document",
            error: error
        };
    }
}

const deleteFirst = async (id: string) => {
    try {
        const docRef = db.collection('firsts').doc(id);
        await docRef.delete();
        logger.info(`Successfully deleted first document with id: ${id}`);
        return {
            success: true,
            message: "Document deleted successfully",
            id: id
        };
    } catch (error:any) {
        return {
            success: false,
            message: "Error: Document delete ERROR: " + error.message,
            id: id
        };
    }
}

const getFirstById = async (id: string) => {
    const docRef = db.collection('firsts').doc(id);
    const doc = await docRef.get();
    return doc
}

const updateFirst = async (id: string, data: Partial<FirstType>) => {
    const docRef = db.collection('firsts').doc(id);
    await docRef.update(data);
    logger.info(`Successfully updated first document with id: ${id}`);
    return {
        success: true,
        message: "Document updated successfully",
        id: id
    };
}

const firstsGetAll = async (query:any) => {
    const querySnapshot = await db.collection('firsts').where(...query).get();
    const firsts: FirstType[] = [];
    querySnapshot.forEach((doc:any) => {
        firsts.push(doc.data() as FirstType);
    });
    return {
        success: true,
        data: firsts
    };
}

export default {
    firstCollectionInitialize,
    createFirst,
    deleteFirst,
    getFirstById,
    updateFirst,
    firstsGetAll
}