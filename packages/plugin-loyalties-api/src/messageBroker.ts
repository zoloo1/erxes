import { generateModels } from './connectionResolver';
import { ISendMessageArgs, sendMessage } from '@erxes/api-utils/src/core';
import { serviceDiscovery } from './configs';

let client;

export const initBroker = async (cl) => {
  client = cl;

  const { consumeRPCQueue } = client;

  consumeRPCQueue('loyalties:voucherCampaigns.find', async ({ subdomain, data }) => {
    const models = await generateModels(subdomain);

    return {
      data: await models.VoucherCampaigns.find(data).lean(),
      status: 'success',
    };
  });
};


export const sendProductsMessage = async (args: ISendMessageArgs): Promise<any> => {
  return sendMessage({ client, serviceDiscovery, serviceName: 'products', ...args });
};

export const sendContactsMessage = async (args: ISendMessageArgs): Promise<any> => {
  return sendMessage({ client, serviceDiscovery, serviceName: 'contacts', ...args });
};

export const sendCoreMessage = async (args: ISendMessageArgs): Promise<any> => {
  return sendMessage({ client, serviceDiscovery, serviceName: 'core', ...args });
};

export const sendNotificationsMessage = async (args: ISendMessageArgs): Promise<any> => {
  return sendMessage({ client, serviceDiscovery, serviceName: 'notifications', ...args });
};

export const sendCommonMessage = async (channel, message): Promise<any> => {
  return client.sendMessage(channel, message);
};

export const sendRPCMessage = async (channel, message): Promise<any> => {
  return client.sendRPCMessage(channel, message);
};

export default function() {
  return client;
}
