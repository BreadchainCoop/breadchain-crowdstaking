// This shim is needed for vitejs. No workaround for now
import { Buffer } from 'buffer';

window.Buffer = Buffer;
