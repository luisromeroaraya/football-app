package com.backend.footballapp.exceptions;

public class ElementNotFoundException extends RuntimeException {
    private final Class<?> clazz;
    private final Object object;

    public ElementNotFoundException(Class<?> clazz, Object object) {
        super("Cannot find " + clazz.getSimpleName() + ": " + object);
        this.clazz = clazz;
        this.object = object;
    }

    public Class<?> getClazz() {
        return clazz;
    }

    public Object getObject() {
        return object;
    }
}
