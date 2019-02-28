#include "pxt.h"

using namespace pxt;
namespace LCD {
    bool initialized = false;

    //%
    void pinInit() {
        if (initialized) return;

    // mount buttons on the pins with a pullup mode
    // TODO: fix this issue in the DAL itself
#define ALLOC_PIN_BUTTON(id) new MicroBitButton(getPin(id)->name, id, MICROBIT_BUTTON_ALL_EVENTS, PullUp);
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P6);
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P7);
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P8);
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P9);
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P10);
#undef ALLOC_PIN_BUTTON

        initialized = true;
    }
}
