import {
    Lucid
    , Blockfrost
    , Network
} from '@lucid-evolution/lucid'

console.log('here')

const blockfrostClient = new Blockfrost(
    'https://cardano-preview.blockfrost.io/api/v0'
    , 'previewtmnlb9Ant5w6IVCSk0FKytMbYYjygteB'
)
    , lucid = await Lucid.new(
        blockfrostClient,
        'Preview' as Network
    )
