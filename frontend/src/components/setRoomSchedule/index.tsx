import { userContext } from '@/store/Auth';
import {
    Box,
    Button,
    Fieldset,
    Flex,
    Input,
    NativeSelectField,
    NativeSelectRoot,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoomSchedule } from '../../definitions/Schedule';
import { Title } from '../myui/Title';
import { Field } from '../ui/field';

export default function SetRoomSchedule() {
    const { roomId } = useParams<{ roomId: string }>();
    const user = useContext(userContext)!.user;
    const [roomScheduleState, setRoomScheduleState] = useState<RoomSchedule[]>(
        []
    );

    const navigate = useNavigate();

    const addRoomScheduleState = () => {
        setRoomScheduleState([
            ...roomScheduleState,
            {
                dayOfWeek: 'Mon',
                // Date型で初期化
                startTime: new Date(),
                endTime: new Date(),
            },
        ]);
    };

    const removeRoomScheduleState = (index: number) => {
        const newRoomScheduleState = [...roomScheduleState];
        newRoomScheduleState.splice(index, 1);
        setRoomScheduleState(newRoomScheduleState);
    };

    return (
        <>
            <Title title="部屋スケジュール設定" />
            <Box
                w={{ base: '90%', lg: '50%' }}
                m="auto"
                p="4"
                borderWidth="2px"
                borderColor="fg"
                borderRadius="md"
            >
                <Fieldset.Root size="lg" maxW="md">
                    <Fieldset.Content>
                        <Field label="スケジュール設定">
                            {roomScheduleState.map((schedule, index) => (
                                <Flex
                                    key={index}
                                    align="center"
                                    justify="space-between"
                                    px="3"
                                    py="3"
                                >
                                    <Stack direction="row" gap={2}>
                                        <NativeSelectRoot>
                                            <NativeSelectField
                                                value={schedule.dayOfWeek}
                                                onChange={(e) => {
                                                    const newRoomScheduleState =
                                                        [...roomScheduleState];
                                                    newRoomScheduleState[
                                                        index
                                                    ].dayOfWeek =
                                                        e.target.value;
                                                    setRoomScheduleState(
                                                        newRoomScheduleState
                                                    );
                                                }}
                                            />
                                        </NativeSelectRoot>
                                    </Stack>

                                    <Flex gap="2">
                                        <Stack direction="row" gap={2}>
                                            <Text>開始時間</Text>
                                            <Input
                                                type="time"
                                                value={schedule.startTime.toTimeString()}
                                                onChange={(e) => {
                                                    const newRoomScheduleState =
                                                        [...roomScheduleState];
                                                    newRoomScheduleState[
                                                        index
                                                    ].startTime = new Date(
                                                        e.target.value
                                                    );
                                                    setRoomScheduleState(
                                                        newRoomScheduleState
                                                    );
                                                }}
                                            />
                                        </Stack>
                                        <Stack direction="row" gap={2}>
                                            <Text>終了時間</Text>
                                            <Input
                                                type="time"
                                                value={schedule.endTime.toTimeString()}
                                                onChange={(e) => {
                                                    const newRoomScheduleState =
                                                        [...roomScheduleState];
                                                    newRoomScheduleState[
                                                        index
                                                    ].endTime = new Date(
                                                        e.target.value
                                                    );
                                                    setRoomScheduleState(
                                                        newRoomScheduleState
                                                    );
                                                }}
                                            />
                                        </Stack>
                                        <Button
                                            variant="subtle"
                                            color="primary"
                                            onClick={() => {
                                                removeRoomScheduleState(index);
                                            }}
                                        >
                                            削除
                                        </Button>
                                    </Flex>
                                </Flex>
                            ))}
                        </Field>
                        <Button
                            variant="subtle"
                            color="primary"
                            onClick={() => {
                                addRoomScheduleState();
                            }}
                        >
                            スケジュールを追加
                        </Button>
                    </Fieldset.Content>

                    <Button type="submit" alignSelf="flex-start">
                        部屋のスケジュールを設定
                    </Button>
                </Fieldset.Root>
            </Box>
        </>
    );
}
