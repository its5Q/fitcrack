#!/bin/sh
set -e

#
# See: http://boinc.berkeley.edu/trac/wiki/AndroidBuildClient#
#

# Script to compile BOINC for Android

STDOUT_TARGET="${STDOUT_TARGET:-/dev/stdout}"
COMPILEBOINC="yes"
CONFIGURE="yes"
MAKECLEAN="yes"
VERBOSE="${VERBOSE:-no}"

export BOINC=".." #BOINC source code

export NDK_ROOT=${NDK_ROOT:-$HOME/Android/Ndk}
export ANDROID_TC="${ANDROID_TC:-$HOME/android-tc}"
export ANDROIDTC="${ANDROID_TC_X86:-$ANDROID_TC/x86}"
export TOOLCHAINROOT="$NDK_ROOT/toolchains/llvm/prebuilt/linux-x86_64/"
export TCBINARIES="$TOOLCHAINROOT/bin"
export TCINCLUDES="$ANDROIDTC/i686-linux-android"
export TCSYSROOT="$TOOLCHAINROOT/sysroot"

export PATH="$TCBINARIES:$TCINCLUDES/bin:$PATH"
export CC=i686-linux-android16-clang
export CXX=i686-linux-android16-clang++
export LD=i686-linux-android-ld
export CFLAGS="--sysroot=$TCSYSROOT -DANDROID -DDECLARE_TIMEZONE -Wall -I$TCINCLUDES/include -O3 -fomit-frame-pointer -fPIE -D__ANDROID_API__=16"
export CXXFLAGS="--sysroot=$TCSYSROOT -DANDROID -Wall -I$TCINCLUDES/include -funroll-loops -fexceptions -O3 -fomit-frame-pointer -fPIE -D__ANDROID_API__=16"
export LDFLAGS="-L$TCSYSROOT/usr/lib -L$TCINCLUDES/lib -llog -fPIE -pie -latomic -static-libstdc++"
export GDB_CFLAGS="--sysroot=$TCSYSROOT -Wall -g -I$TCINCLUDES/include"
export PKG_CONFIG_SYSROOT_DIR="$TCSYSROOT"

if [ -n "$COMPILEBOINC" ]; then
    cd "$BOINC"
    echo "===== building BOINC for x86 from $PWD ====="    
    if [ -n "$MAKECLEAN" ] && [ -f "Makefile" ]; then
        if [ "$VERBOSE" = "no" ]; then
            make distclean 1>$STDOUT_TARGET 2>&1
        else
            make distclean SHELL="/bin/bash -x"
        fi
    fi
    if [ -n "$CONFIGURE" ]; then
        ./_autosetup
        ./configure --host=i686-linux --with-boinc-platform="x86-android-linux-gnu" --with-ssl="$TCINCLUDES" --disable-server --disable-manager --disable-shared --enable-static --disable-largefile
    fi
    if [ "$VERBOSE" = "no" ]; then
        make --silent
        make stage --silent
    else
        make SHELL="/bin/bash -x"
        make stage SHELL="/bin/bash -x"
    fi

    echo "Stripping Binaries"
    cd stage/usr/local/bin
    i686-linux-android-strip *
    cd ../../../../

    echo "Copy Assets"
    cd android
    mkdir -p "BOINC/app/src/main/assets"
    cp "$BOINC/stage/usr/local/bin/boinc" "BOINC/app/src/main/assets/x86/boinc"
    cp "$BOINC/win_build/installerv2/redist/all_projects_list.xml" "BOINC/app/src/main/assets/all_projects_list.xml"
    cp "$BOINC/curl/ca-bundle.crt" "BOINC/app/src/main/assets/ca-bundle.crt"

    echo "===== BOINC for x86 build done ====="

fi
