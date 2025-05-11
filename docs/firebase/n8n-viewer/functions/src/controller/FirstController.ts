import * as logger from "firebase-functions/logger"
import {FirstType} from "../types/First.types";
import FirstRepository from "../repository/FirstRepository.ts";
import FirstService from "../service/FirstService";

const handleRequest = async (req: any, res: any) => {
    const {method, body, query} = req;

    switch (method) {
        case 'POST':
            const {action} = body;

            if (!action) {
                return res.status(400).send({error: 'Missing action in request body'});
            }

            switch (action) {
                case 'initialize':
                    // Initialize the main prompt collection with data from AgentRoster
                    logger.log("Initializing first controller");

                    return FirstRepository.firstCollectionInitialize()
                        .then((initializationResponse:any) => {
                            return res.status(200).send(initializationResponse);
                        }).catch((error:any) => {
                            logger.error("Error initializing firsts:", error);
                            return res.status(500).send({
                                success: false,
                                error: 'Failed to initialize firsts'
                            });
                        });
                case 'create':
                    if (!body.data) {
                        return res.status(400).send({error: 'Missing firsts data'});
                    }
                    if (!body.data.id) {
                        return res.status(400).send({error: 'Missing first id'});
                    }

                    return FirstRepository.createFirst(body.data as FirstType)
                        .then((createPromptResp:any) => {
                            return res.status(201).send(createPromptResp);
                        })
                        .catch((error:any) => {
                            return res.status(500).send(error);
                        });
                case 'workflow':
                    if (!body.data) {
                        return res.status(400).send({error: 'Missing data to workflow'});
                    }
                    if (!body.data.id) {
                        return res.status(400).send({error: 'Missing some data id needed to for this workflow'});
                    }

                    return FirstService.executeWorkflow(body.data as FirstType)
                        .then((processedResp:any) => {
                            return res.status(201).send(processedResp);
                        })
                        .catch((error:any) => {
                            return res.status(500).send(error);
                        });
                default:
                    return res.status(400).send({error: 'Invalid action specified'});
            }

        case 'GET':
            const getFirstId = query.id;

            // If an ID is provided, get that specific agent
            if (getFirstId) {
                const getFirstResponse = await FirstRepository.getFirstById(getFirstId);
                return res.status(200).send(getFirstResponse);
            }

            return FirstRepository.firstsGetAll(query)
                .then((getAllFirstsResponse) => {
                    return res.status(200).send(getAllFirstsResponse);
                }).catch((error) => {
                    return res.status(400).send({error: 'Error fetching all prompts', details: error});
                })
        case 'PUT':
            const putFirstId = query.id || (body.data && body.data.id);

            if (!putFirstId) {
                return res.status(400).send({error: 'First ID is required'});
            }

            if (!body.data) {
                return res.status(400).send({error: 'Missing first data'});
            }

            await FirstRepository.updateFirst(putFirstId, body.data as FirstType)
                .then((updatePromptResp:any) => {
                    return res.status(200).send(updatePromptResp);
                }).catch((e: any) => {
                    return res.status(500).send({
                        success: false,
                        error: 'Failed to update agent profile: ' + e.message
                    });
                });
            break;
        case 'DELETE':
            const firstId = query.id || (body.data && body.data.id);

            if (!firstId) {
                return res.status(400).send({error: 'First ID is required'});
            }

            return FirstRepository.deleteFirst(firstId).then((deleteAgentResp:any) => {
                return res.status(200).send(deleteAgentResp);
            }).catch((e:any) => {
                return res.status(500).send({
                    success: false,
                    error: 'Failed to delete agent profile: '+ e.message
                });
            });
        default:
            return res.status(405).send({error: 'Method Not Allowed'});
    }
}

export default {handleRequest}