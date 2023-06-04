import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";

let APP_ID = "cb16ef20c6c742208649235512a458c1";
let rtmClient;
let client;
let channel;

const AgoraInit = async (uid, token, displayName) => {
  rtmClient = AgoraRTM.createInstance(APP_ID);
  await rtmClient.login({ uid: uid, token: token });
  await rtmClient.addOrUpdateLocalUserAttributes({
    name: displayName,
  });
};

const CreateChannelJoin = async (roomid) => {
  channel = await rtmClient.createChannel(roomid);
  channel.join();
  return roomid;
};

const CreateChannel = async (roomid) => {
  channel = await rtmClient.createChannel(roomid);
  return { channel, roomid };
};

const CreateClientJoin = async (roomId, token, uid) => {
  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  await client.join(APP_ID, roomId, token, uid);
  return client;
};

const CreateTracks = async () => {
  let localTracks = await AgoraRTC.createMicrophoneAndCameraTracks(
    {},
    {
      encoderConfig: {
        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 480, ideal: 1080, max: 1080 },
      },
    }
  );

  return localTracks;
};

export {
  AgoraInit,
  CreateChannel,
  CreateChannelJoin,
  CreateClientJoin,
  CreateTracks,
};
